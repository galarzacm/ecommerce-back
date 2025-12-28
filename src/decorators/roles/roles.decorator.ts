import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../../enum/roles.enum";

export const ROLES_KEY = "roles";
export const RolesDecorator = (...roles: RoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
