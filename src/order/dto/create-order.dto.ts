import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  //swagger
  @ApiProperty({
    required: true,
    description: "userId",
    example: "a1b0bc02-b8e0-4759-aece-cee5a0de9c94",
  })
  userId: string;

  @IsArray()
  @ArrayMinSize(1, { message: "Debe incluir al menos un product " })
  @ValidateNested({ each: true }) //Valida las propiedades del objeto
  //swagger
  @ApiProperty({
    required: true,
    description: "products[{id}, {id}]",
    example: [
      { id: "77fd9862-98bc-47d9-bb1c-8aa0f2a7a842" },
      { id: "be55b4fc-de0e-4d4a-b790-d04a9d7c01b6" },
    ],
  })
  products: Partial<Product[]>;
}
