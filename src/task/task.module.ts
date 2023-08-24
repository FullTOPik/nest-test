import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { Task, TaskSchema } from "src/entities/task.entety";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "src/user/user.repository";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
