import { PartialType } from "@nestjs/mapped-types";
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { Order } from "../../order/entities/order.entity";

export class ResponseUserDto extends PartialType(CreateUserDto) {
  // •	id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // •	name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
  @Column({ length: 50, nullable: false })
  name: string;

  // •	password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.
  //VER el proceso de hashin crea 64 caracteres / SALT 5 / o length: 80
  @Column({ length: 80, nullable: false }) //({select: false }) // excluye la contraseña por defecto
  //MALA IDEA ==> Conviene un DTO Personalizado
  //@Column({ length: 80, nullable: false })
  password: string;

  // •	email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  // •	phone: debe ser un número entero.
  @Column("int")
  phone: number;

  // •	country: debe ser una cadena de texto de máximo 50 caracteres.
  @Column({ length: 50, nullable: true })
  country: string;

  // •	address: debe ser un texto.
  @Column({ nullable: true })
  address: string;

  // •	city: debe ser una cadena de texto de máximo 50 caracteres.
  @Column({ length: 50, nullable: true })
  city: string;

  @Column({
    select: false,
    type: "boolean",
    default: false,
  })
  isAdmin: boolean;

  // •	orders_id: Relación 1:N con orders.
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: "orders_id" })
  orders: Order[];
}
