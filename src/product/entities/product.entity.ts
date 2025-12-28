import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  //Unique,
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { OrderDetail } from "../../order-detail/entities/order-detail.entity";
import { Order } from "../../order/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Unique(["name"])
@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    //swagger
    description: "UUID",
    example: "3768124b-5a0e-4ab0-8b1d-da71fe8ed372",
  })
  id: string;

  @Column() //({ unique: true })
  @ApiProperty({
    //swagger
    required: true,
    description: "Product name unique",
    example: "Iphone 15",
  })
  name: string;

  @Column()
  @ApiProperty({
    //swagger
    required: true,
    description: "short description",
    example: "The best smartphone in the world",
  })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  //@Column()
  @ApiProperty({
    //swagger
    required: true,
    description: "Product Price",
    example: 200,
  })
  price: number;

  @Column()
  @ApiProperty({
    //swagger
    required: true,
    description: "Product stock",
    example: 10,
  })
  stock: number;

  // •	imgUrl: debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
  @Column({
    type: "text",
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOLrWUq2HcJZQmPcKU6qHESxnTrlsULFOxTA&s",
  })
  @ApiProperty({
    //swagger
    required: false,
    description: "Product url",
    example: "https://product.com",
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @ApiProperty({
    //swagger
    required: true,
    description: "What category does the product belong to?",
    example: { name: "smartphone" },
  })
  category: Category;

  // •	Relación N:N con products.
  //1 orderDetail puede tener muchos productos
  //1 producto puede estar en muchas orderDetails
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable({ name: "order_details-products" })
  orderDetails: OrderDetail[];
  orderDetail: Promise<Order>;
}
