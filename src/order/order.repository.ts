import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { DataSource, Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { OrderDetail } from "../order-detail/entities/order-detail.entity";

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,

    @InjectRepository(User)
    private userService: Repository<User>,

    @InjectRepository(Product)
    private productService: Repository<Product>,

    private readonly dataSource: DataSource,
  ) {}

  async addOrder(
    userId: string,
    products,
  ): Promise<
    Array<{
      id: string;
      date: Date;
      orderDetail: { id: string; price: string };
    }>
  > {
    return await this.dataSource.transaction(async (manager) => {
      let total = 0;

      const user = await this.userService.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with Id #${userId} Not found`);
      }

      const productsArray: Array<Product> = [];
      for (const element of products) {
        const product = await this.productService.findOneBy({ id: element.id });
        if (!product) {
          throw new NotFoundException(`Product not found`);
        }
        if (product.stock === 0) {
          throw new NotFoundException(`There is no product in stock = 0`);
        }
        total += Number(product.price);
        productsArray.push(product);
      }

      const order = manager.create(Order, {
        date: new Date(),
        user,
      });
      const newOrder = await manager.save(order);

      await Promise.all(
        productsArray.map(async (product) => {
          await manager.update(
            Product,
            { id: product.id },
            { stock: product.stock - 1 },
          );
        }),
      );

      const orderDetail = manager.create(OrderDetail, {
        price: Number(total.toFixed(2)),
        products: productsArray,
        order: newOrder,
      });
      const newOrderDetail = await manager.save(orderDetail);

      return [
        {
          id: newOrder.id,
          date: newOrder.date,
          orderDetail: {
            id: newOrderDetail.id,
            price: newOrderDetail.price.toFixed(2),
          },
        },
      ];
    });
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        orderDetail: { products: true },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id#${id} not found`);
    }
    return order;
  }

  async removeById(id: string): Promise<void> {
    const result = await this.orderRepository.delete(id); // método built-in delete

    if (result.affected === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
