import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private task = [];

  getAllTasks() {
    return this.task;
  }
}
