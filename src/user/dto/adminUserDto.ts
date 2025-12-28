import { PartialType } from "@nestjs/mapped-types";
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { Order } from "../../order/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";

export class adminUserDto extends PartialType(CreateUserDto) {
  // •	id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    //swagger
    required: true,
    description: "User name",
    example: "jonh Smith",
  })
  @Column()
  name: string;

  @ApiProperty({
    //swagger
    required: true,
    description: "Strong Password",
    example: "PassWord1234***",
  })
  @Column({ length: 80, nullable: false })
  password: string;

  @ApiProperty({
    //swagger
    required: true,
    description: "Email",
    example: "example@example.com",
  })
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    //swagger
    required: true,
    description: "Number Phone",
    example: 1234654,
  })
  @Column("int")
  phone: number;

  @ApiProperty({
    //swagger
    required: true,
    description: "User country",
    example: "Argentina",
  })
  @Column({ length: 50, nullable: true })
  country: string;

  @ApiProperty({
    //swagger
    required: false,
    description: "Addres",
    example: "Streed 10",
  })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({
    //swagger
    required: false,
    description: "User city",
    example: "Buenos Aires",
  })
  @Column({ length: 50, nullable: true })
  city: string;

  //swagger
  @ApiProperty({
    required: false,
    description: "Rol in app",
    example: "Admin or User",
  })
  @Column({
    type: "boolean",
  })
  isAdmin: boolean;
}
