import { Task } from '../entities/tasks.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private task: Task[] = [];

  getAllTasks(): Task[] {
    return this.task;
  }
}
