import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "src/entities/task.entety";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskRepository: Model<Task>,
    private userRepository: UserRepository
  ) {}

  async getAllTasks(email: any) {
    const user = await this.userRepository.getUser(email);

    return this.taskRepository.find({ userId: user._id });
  }

  async create(email: any, title: any, description: any) {
    const user = await this.userRepository.getUser(email);

    return this.taskRepository.create({ userId: user._id, title, description });
  }
}
