import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { AuthGuard } from "../guards/authGuard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesDecorator } from "../decorators/roles/roles.decorator";
import { RoleEnum } from "../enum/roles.enum";
import { RolesGuard } from "../guards/roles.guard";

@Controller("product")
@ApiTags("Products - endpoinds / routes")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | null> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  async findOneProductById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return this.productService.findOneBy(id);
  }

  @Patch(":id") //modifica solo lo enviado
  //@Put("id")
  @ApiBearerAuth()
  @RolesDecorator(RoleEnum.Admin) //Solo Admin
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<{ deleteProductId }> {
    return this.productService.deleteProductId(id);
  }
}
