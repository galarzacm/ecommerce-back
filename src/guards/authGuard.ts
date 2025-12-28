import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { RoleEnum } from "../enum/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); //->se tiene acceso al objeto request

    const token = request.headers.authorization?.split(" ")[1]; //extrae token

    if (!token) {
      throw new UnauthorizedException("There is not token!!!");
    }

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret }); //valida token
      user.exp = new Date(user.exp * 1000); //horario expiracion
      user.iat = new Date(user.iat * 1000); //horario asignacion

      if (user.isAdmin) {
        user.roles = [RoleEnum.Admin];
      } else {
        user.roles = [RoleEnum.User];
      }

      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException("Invalida Token");
    }
  }
}
