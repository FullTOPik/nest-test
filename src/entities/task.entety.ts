import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.entity";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  description: string;

  @Prop({ default: "" })
  title: string;

  @Prop({ default: new Date() })
  timestamp: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
