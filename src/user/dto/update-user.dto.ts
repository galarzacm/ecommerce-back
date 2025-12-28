import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    //swagger
    required: true,
    description: "User name",
    example: "jonh Smith",
  })
  name?: string;

  @IsStrongPassword()
  @Matches(
    //Regex
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        "***La contrasena debe contener al menos una minuscula, una MAYUSCULA, un numero, un caracter",
    },
  )
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: true,
    description: "Strong Password",
    example: "PassWord1234***",
  })
  password?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    //swagger
    required: true,
    description: "Email",
    example: "example@example.com",
  })
  email?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: true,
    description: "Number Phone",
    example: 1234654,
  })
  phone?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsOptional()
  @ApiProperty({
    //swagger
    required: false,
    description: "Addres",
    example: "Streed 10",
  })
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: true,
    description: "User country",
    example: "Argentina",
  })
  country?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    //swagger
    required: false,
    description: "User city",
    example: "Buenos Aires",
  })
  city?: string;

  @IsBoolean()
  isAdmin?: boolean;
}
