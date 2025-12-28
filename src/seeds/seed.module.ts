import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";
import { CategorieSeed } from "./categorie-seed/categorieSeed";
import { Product } from "../product/entities/product.entity";
import { ProductSeed } from "./product-seed/productSeed";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategorieSeed, ProductSeed],
  exports: [CategorieSeed, ProductSeed],
})
export class SeedModule {}
