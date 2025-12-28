import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

import { OrderRepository } from "./order.repository";

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  addOrder(dto: CreateOrderDto) {
    const { userId, products } = dto;

    return this.orderRepository.addOrder(userId, products);
  }

  getOrderById(id: string) {
    return this.orderRepository.getOrderById(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.orderRepository.removeById(id);

    return { message: `Order with id ${id} has been deleted` };
  }
}
