import { Injectable, UnauthorizedException } from "@nestjs/common";
import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from "src/constants/environment";
import { JwtService } from "@nestjs/jwt";
import { Token } from "src/entities/token.entity";
import { BaseUserWithoutPassword } from "src/user/interfaces/base-user-without-password.interface";
import { GeneratedTokens } from "./interfaces/tokens.interface";
import { ValidateToken } from "./interfaces/validate-token.interface";
import { UserAndTokens } from "src/auth/interfaces/user-and-tokens.interface";
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from "src/constants/constants";
import { TokenRepository } from "./token.repository";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly tokenRepository: TokenRepository
  ) {}

  generateTokens(payload: { email: string }): GeneratedTokens {
    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_ACCESS_SECRET,
      expiresIn: accessTokenLifeTime,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: refreshTokenLifeTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): ValidateToken {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_ACCESS_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }

  saveToken(user: BaseUserWithoutPassword, token: string): Promise<Token> {
    return this.tokenRepository.save({ userId: user.userId, token });
  }

  validateRefereshToken(token: string): ValidateToken {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_REFRESH_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }

  async deleteRefreshToken(token: string): Promise<Token> {
    const tokenRecord = await this.tokenRepository.findOne({ token });

    return await this.tokenRepository.delete({ token });
  }

  async refresh(token: string): Promise<UserAndTokens> {
    const { iat, exp, ...userData } = this.validateRefereshToken(token);
    const tokenRecord = await this.tokenRepository.checkRefreshToken(token);
    await this.deleteRefreshToken(tokenRecord.token);
    const generatedTokens = this.generateTokens({ email: userData.email });
    await this.tokenRepository.save({
      userId: userData.userId,
      token: generatedTokens.refreshToken,
    });

    return { user: userData, tokens: generatedTokens };
  }
}
