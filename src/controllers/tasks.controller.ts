import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/tasks.entity';
import { CreateTask } from 'src/dtos/tasks/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body() body: CreateTask) {
    console.log('body', body);
  }
}
