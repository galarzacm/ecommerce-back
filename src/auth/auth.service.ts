import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginUserDto } from "./dto/loginUserDto";
import * as bcrypt from "bcrypt";
//import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: LoginUserDto) {
    const userFound = await this.userService.findByEmail(credentials.email);
    if (!userFound) {
      throw new UnauthorizedException("invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(
      credentials.password,
      userFound.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const userPayLoad = {
      id: userFound.id,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
    };

    const token = this.jwtService.sign(userPayLoad); //JWT_Secret
    return {
      token,
      message: "User successfully logged in",
    };
  }

  async signUp(user: CreateUserDto) {
    const userExist = await this.userService.findByEmail(user.email);
    if (userExist) {
      throw new NotFoundException("User Exist");
    }
    if (user.password !== user.confirmPassword) {
      throw new NotFoundException("Password do not match");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) {
      throw new NotFoundException("password do not hash");
    }

    await this.userService.create({
      ...user,
      password: hashedPassword,
    });

    const { password, confirmPassword, ...userWithOutPassword } = user;
    return userWithOutPassword;
  }
}
