import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  IsUUID,
} from "class-validator";

export class CategoryDto {
  // ID: UUID (opcional, si se proporciona)
  @ApiProperty({
    //swagger
    required: false,
    description: "UUID",
    example: "3768124b-5a0e-4ab0-8b1d-da71fe8ed372",
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  // Nombre de la categoría: Cadena de texto, no nulo, máx. 50 caracteres
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
