import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUserDto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth - endpoinds / routes")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  signin(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn({ email, password });
  }

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
}
