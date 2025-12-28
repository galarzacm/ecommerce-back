import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}

  //ok
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      price,
      stock,
      imgUrl,
      category: categoryDto,
    } = createProductDto;

    //verificar que exista la categoria por su nombre
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryDto?.name },
    });
    if (!existingCategory) {
      throw new NotFoundException(
        `Category with name: ${categoryDto?.name} doesn't exist`,
      );
    }
    // Verificar si ya existe un producto con ese nombre
    const existingProduct = await this.productRepository.findOne({
      where: { name },
    });
    if (existingProduct) {
      throw new NotFoundException(`Product with name #"${name}" already exist`);
    }
    //crear el nuevo producto
    const newProduct = this.productRepository.create({
      name,
      description,
      price,
      stock,
      imgUrl,
      category: existingCategory,
    });

    return this.productRepository.save(newProduct);
  }

  //--------------
  //ok
  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ["category"],
    });
    return products;
  }
  //---
  //ok
  async findOneBy(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["category"],
    });

    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product wiht Id #${product} not found`);
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  //--//--
  async deleteProductId(id: string): Promise<{
    deleteProductId: string;
    name: string;
    description: string;
  }> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with Id #${id} Not found`);
    }
    await this.productRepository.remove(product);
    return {
      deleteProductId: id,
      name: product.name,
      description: product.description,
    };
  }
}
