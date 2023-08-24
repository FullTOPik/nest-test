import { ObjectId } from "mongoose";

export interface BaseUserWithoutPassword {
  userId?;
  email?;
}
