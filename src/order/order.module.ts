import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderDetail } from "../order-detail/entities/order-detail.entity";
import { User } from "../user/entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { OrderRepository } from "./order.repository";
import { DataSource } from "typeorm";
import { OnlyLoggedInGuard } from "../guards/onlyLoggedIn.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, User, Product, DataSource]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OnlyLoggedInGuard],
  exports: [OrderService, OnlyLoggedInGuard],
})
export class OrderModule {}
