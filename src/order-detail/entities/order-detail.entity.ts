import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    //swagger
    description: "UUID",
    example: "3768124b-5a0e-4ab0-8b1d-da71fe8ed372",
  })
  id: string;

  // •	price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  @ApiProperty({
    //swagger
    required: true,
    description: "price of order",
    example: 250,
  })
  price: number;

  // •	order_id: Relación 1:1 con orders.
  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: "order_id" })
  @ApiProperty({
    //swagger
    description: "Relations OneToOne with Order",
    example: "OrderDetail Order",
  })
  order: Order;

  // @JoinColumn()  // Indica que este es el lado de la relación
  //posee la clave foránea
  //se setea Solo de un lado de la relacion

  // •	Relación N:N con products.
  //1 orderDetail puede tener muchos productos
  //1 producto puede estar en muchas orderDetails
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({ name: "order_details-products" })
  products: Product[];

  orderDetails: Promise<Order>;
}
