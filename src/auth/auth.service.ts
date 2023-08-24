import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/entities/user.entity";
import * as bcrypt from "bcryptjs";
import { TokenService } from "src/token/token.service";
import { UserAndTokens } from "./interfaces/user-and-tokens.interface";
import { Token } from "src/entities/token.entity";
import { BaseUserWithoutPassword } from "src/user/interfaces/base-user-without-password.interface";
import { PASSWORD_HASH_COST } from "src/constants/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly tokenService: TokenService
  ) {}

  async login(authUserDto: AuthUserDto): Promise<UserAndTokens> {
    const { password: userPassword, ...user } = await this.checkUserCridentials(
      authUserDto
    );
    const generatedTokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user, generatedTokens.refreshToken);

    return { user, tokens: generatedTokens };
  }

  async register(registerUserDto: AuthUserDto): Promise<UserAndTokens> {
    console.log("here");
    await this.userRepository.checkAlreadyExistEmail(registerUserDto.email);

    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      PASSWORD_HASH_COST
    );

    const newUser = await this.userRepository.createNewUser(
      registerUserDto.email,
      hashedPassword
    );

    const generatedTokens = this.tokenService.generateTokens({
      email: registerUserDto.email,
    });

    await this.tokenService.saveToken(
      { userId: newUser._id },
      generatedTokens.refreshToken,
    );

    return {
      user: { email: newUser.email } as { email: string },
      tokens: generatedTokens,
    };
  }

  async checkUserCridentials(userDto: AuthUserDto): Promise<User> {
    const user = await this.userRepository.checkUserEmailExistance(
      userDto.email
    );

    const passwordsIsEqual = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (!passwordsIsEqual) {
      throw new UnauthorizedException({
        message: "Некорректный пароль",
      });
    }

    return user;
  }

  async logout(token: string): Promise<Token> {
    return this.tokenService.deleteRefreshToken(token);
  }

  async refresh(token: string): Promise<UserAndTokens> {
    return this.tokenService.refresh(token);
  }

  async checkAuth(token: string): Promise<BaseUserWithoutPassword> {
    const { iat, exp, ...userData } =
      this.tokenService.validateAccessToken(token);
    return userData;
  }
}
