import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    //swagger
    required: true,
    description: "User email",
    example: "admin@example.com",
  })
  email: string;

  @IsStrongPassword()
  @Matches(
    //Regex
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        "LoginAuthDto La contraseña debe contener al menos una minuscula, una MAYUSCULA, un numero, un caracter",
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
  password: string;
}
