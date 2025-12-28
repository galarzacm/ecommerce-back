import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/authGuard";
import { OnlyLoggedInGuard } from "../guards/onlyLoggedIn.guard";

@Controller("order")
@ApiTags("Order - endpoints / routes")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.addOrder(createOrderDto);
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, OnlyLoggedInGuard)
  getOrderById(@Param("id", ParseUUIDPipe) id: string) {
    return this.orderService.getOrderById(id);
  }

  // @Get()
  // async findAll() {
  //   return this.orderService.findAll();
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.orderService.remove(id);
  }
}
