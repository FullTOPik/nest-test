import { Global, Module } from "@nestjs/common";
import { TokenRepository } from "./token.repository";
import { TokenService } from "./token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token, TokenSchema } from "src/entities/token.entity";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [TokenRepository, TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
