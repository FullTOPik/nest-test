import { BaseUserWithoutPassword } from "src/user/interfaces/base-user-without-password.interface";

export interface ValidateToken extends BaseUserWithoutPassword {
  iat: number;
  exp: number;
}
