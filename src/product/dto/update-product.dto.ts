import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Category } from "../../category/entities/category.entity";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // Nombre: Cadena de texto, no nulo, máx. 50 caracteres
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    //swagger
    required: true,
    description: "Product name",
    example: "Iphone 15",
  })
  name?: string;

  // Descripción: Texto, no nulo
  @IsString()
  @ApiProperty({
    //swagger
    required: true,
    description: "short description",
    example: "The best smartphone in the world",
  })
  description?: string;

  @ApiProperty({
    //swagger
    required: true,
    description: "Product Price",
    example: 200,
  })
  price?: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    //swagger
    required: true,
    description: "Product stock",
    example: 10,
  })
  stock?: number;

  // Imagen: URL opcional, con valor por defecto
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    //swagger
    required: false,
    description: "Product url",
    example: "https://product.com",
  })
  imgUrl?: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOLrWUq2HcJZQmPcKU6qHESxnTrlsULFOxTA&s";

  // Relación con la categoría (opcional para crear un producto)
  @IsOptional()
  @ApiProperty({
    //swagger
    required: true,
    description: "What category does the product belong to?",
    example: { name: "smartphone" },
  })
  @Type(() => Category) // DTO básico para la categoría
  category?: Category;
}
