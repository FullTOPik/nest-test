import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllTasks(@Query("email") email: string) {
    return this.taskService.getAllTasks(email);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body("email") email: string,
    @Body("title") title: string,
    @Body("description") description: string
  ) {
    return this.taskService.create(email, title, description);
  }
}
