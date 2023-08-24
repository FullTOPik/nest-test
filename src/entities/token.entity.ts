import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.entity";

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
