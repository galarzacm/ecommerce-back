import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OnlyLoggedInGuard implements CanActivate {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orderId = request.params.id;

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ["user"],
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }
    if (order.user.id !== user.sub && order.user.id !== user.id) {
      throw new ForbiddenException("Access denied - the id does not belong to your order");
    }
    return true;
  }
}
