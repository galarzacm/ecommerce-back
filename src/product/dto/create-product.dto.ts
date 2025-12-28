import { Category } from "../../category/entities/category.entity";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateProductDto {
  // Nombre: Cadena de texto, no nulo, máx. 50 caracteres
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    //swagger
    required: true,
    description: "Product name",
    example: "Iphone 15",
  })
  name: string;

  // Descripción: Texto, no nulo
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: true,
    description: "short description",
    example: "The best smartphone in the world",
  })
  description: string;

  // Precio: Número decimal, no nulo, mayor o igual a 0
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: true,
    description: "Product Price",
    example: 200,
  })
  price: number;

  // Stock: Número entero, no nulo, mayor o igual a 0
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: true,
    description: "Product stock",
    example: 10,
  })
  stock: number;

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
  @ValidateNested()
  @ApiProperty({
    //swagger
    required: true,
    description: "What category does the product belong to?",
    example: { name: "smartphone" },
  })
  @Type(() => Category) // DTO básico para la categoría
  category?: Category;

  // // Relación con OrderDetails (opcional para crear un producto)
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => OrderDetailDto) // Aquí podrías tener un DTO básico para orderDetails
  // orderDetails?: OrderDetailDto[];
}
