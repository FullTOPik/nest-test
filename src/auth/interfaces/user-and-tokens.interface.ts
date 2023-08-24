import { GeneratedTokens } from "src/token/interfaces/tokens.interface";
import { BaseUserWithoutPassword } from "src/user/interfaces/base-user-without-password.interface";

export interface UserAndTokens {
  user: BaseUserWithoutPassword;
  tokens: GeneratedTokens;
}
