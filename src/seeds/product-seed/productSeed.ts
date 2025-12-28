import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../../product/entities/product.entity";
import { Repository } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { productMock } from "./productMock";

@Injectable()
export class ProductSeed {
  constructor(
    @InjectRepository(Category)
    private readonly categorieRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findCategoryByName(category: string) {
    const foundCategory = await this.categorieRepository.findOne({
      where: { name: category },
    });
    if (!foundCategory) {
      throw new Error(`categorieMock ${category} not found`);
    }
    return foundCategory;
  }

  async seed() {
    const existingProductName = (await this.productRepository.find()).map(
      (product) => product.name,
    );

    for (const productData of productMock) {
      if (!existingProductName.includes(productData.name)) {
        const product = new Product();
        product.name = productData.name;
        product.description = productData.description;
        product.price = productData.price;
        product.stock = productData.stock;
        product.imgUrl = productData.imgUrl;
        product.category = await this.findCategoryByName(productData.category);
        await this.productRepository.save(product);
      }
    }
  }
}
