import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateCategoryDto {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    //swagger
    required: false,
    description: "UUID",
    example: "3768124b-5a0e-4ab0-8b1d-da71fe8ed372",
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    //swagger
    required: true,
    description: "Decribe product category",
    example: "smartphone",
  })
  name: string;
}
