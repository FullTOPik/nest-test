import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, UserSchema } from "src/entities/user.entity";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
