import {
  Controller,
  Get,
  Body,
  //Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ResponseUserDto } from "./dto/ResponseUserDto";
import { AuthGuard } from "../guards/authGuard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../guards/roles.guard";
import { RolesDecorator } from "../decorators/roles/roles.decorator";
import { RoleEnum } from "../enum/roles.enum";

@Controller("user")
@ApiTags("Users - endpoinds / routes")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get("email/:email")
  // async getUserByEmail(@Param("email") email: string): Promise<User | null> {
  //   const user = await this.userService.findByEmail(email);
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not fount`);
  //   }
  //   return user;
  // }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.create(createUserDto);
  // }

  @Get(":id")
  @ApiBearerAuth() //proteccion de rutas con swagger
  @UseGuards(AuthGuard)
  async findById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<ResponseUserDto | null> {
    return this.userService.findOneById(id);
  }

  @Get()
  @ApiBearerAuth()
  @RolesDecorator(RoleEnum.Admin) //Solo Admin
  @UseGuards(AuthGuard, RolesGuard)
  async findAllUsers() {
    return this.userService.findAll();
  }

  @Put(":id")
  //@Patch(":id")
  @ApiBearerAuth() //proteccion de rutas con swagger
  @UseGuards(AuthGuard)
  updateUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUser(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<{ deleteUserId: string; name: string; email: string }> {
    return this.userService.deleteUser(id);
  }
}
