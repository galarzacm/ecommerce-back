import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Unique(["name"])
@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    //swagger
    description: "UUID",
    example: "3768124b-5a0e-4ab0-8b1d-da71fe8ed372",
  })
  id: string;

  @Column({ length: 50, nullable: false })
  @ApiProperty({
    //swagger
    required: true,
    description: "Decribe product category",
    example: "smartphone",
  })
  name: string;

  // •	Relación: Category 1:N con products. cascade: tambien elimina products asociados a la category
  @OneToMany(() => Product, (product) => product.category)
  // { cascade: true })
  @JoinColumn({ name: "product_id" })
  @ApiProperty({
    //swagger
    description: "Relations OneToMany with Products",
    example: "smartphone",
  })
  products: Product[];
}
