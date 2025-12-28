import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { ResponseUserDto } from "./dto/ResponseUserDto";
import { adminUserDto } from "./dto/adminUserDto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<ResponseUserDto | null> {
    return await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .addSelect("user.isAdmin")
      .where("user.email = :email", { email })
      .getOne();
  }

  async findOneById(@Param(" id ") id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) {
      throw new NotFoundException(`User whit ID ${id} not fount`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<adminUserDto[]> {
    const allUsers = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.isAdmin") // forzar a traer la columna
      .getMany();
    return allUsers;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id# ${id} not found`);
    }
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existEmail = await this.userRepository.findOneBy({
        email: updateUserDto.email,
      });

      if (existEmail) {
        throw new BadRequestException(`Email already exists`);
      }
    }
    //solo campos para actualizar
    const fieldsToUpdate = { ...updateUserDto };
    delete fieldsToUpdate.id;

    Object.assign(user, fieldsToUpdate);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<{
    deleteUserId: string;
    name: string;
    email: string;
  }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} Not found`);
    }
    await this.userRepository.remove(user);
    return {
      deleteUserId: id,
      name: user.name,
      email: user.email,
    };
  }
}
