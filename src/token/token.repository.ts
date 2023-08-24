import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Token } from "src/entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenRepository {
  constructor(@InjectModel(Token.name) private tokenRepository: Model<Token>) {}

  async checkRefreshToken(token: string): Promise<Token> {
    const tokenRecord = await this.tokenRepository.findOne({
      where: { token },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }

    return tokenRecord;
  }

  async save({ userId, token }) {
    return this.tokenRepository.create({ userId, token });
  }

  async findOne({ token }) {
    return this.tokenRepository.findOne({ token });
  }

  async delete({ token }) {
    return this.tokenRepository.findOneAndDelete({ token });
  }
}
