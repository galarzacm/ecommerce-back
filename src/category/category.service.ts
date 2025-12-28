import { Body, Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}


  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category | undefined> {
    const { name } = createCategoryDto;

    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
    });
    if (existingCategory) {
      throw new NotFoundException(`the Category #${name} already exist `);
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    const allCategory = await this.categoryRepository.find();
    return allCategory;
  }

  async findOneName(@Body("name") name: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ name });

    if (!category)
      throw new NotFoundException(`Not found #${name} in categories`);
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category whit ID #${id} not found`);
    }
    return this.categoryRepository.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
