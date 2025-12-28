import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../../category/entities/category.entity";
import { In, Repository } from "typeorm";
import { categorieMock } from "./categorieMock";

@Injectable()
export class CategorieSeed {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    const existingCategory = await this.categoryRepository.find({
      where: { name: In(categorieMock) },
    });

    for (const categoryName of categorieMock) {
      if (
        !existingCategory.some((category) => category.name === categoryName)
      ) {
        const category = new Category();
        category.name = categoryName;
        await this.categoryRepository.save(category);
      }
    }
  }
}
