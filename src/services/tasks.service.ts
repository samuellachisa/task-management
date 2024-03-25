import { Task } from './../entities/tasks.entity';
import { CreateTaskDto } from 'src/dtos/tasks/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from 'src/dtos/tasks/update-task.dto';
import { GetTasksFilterDto } from 'src/dtos/tasks/get-tasks-filter.dto';
import { TaskRepository } from 'src/repository/task-repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getAllTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // async getTaskById(id: number): Promise<Task> {
  //   const found
  // }
  // getTaskById(id: number): Task {
  //   const found = this.tasks.find((task) => task.id == id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with Id ${id} Not Found `);
  //   } else {
  //     return this.tasks.find((task) => task.id == id);
  //   }
  // }
  // createTasks(createTaskDto: CreateTaskDto): Task {
  //   const { title, description, status } = createTaskDto;
  //   const task: Task = {
  //     id: this.tasks.length + 1,
  //     title,
  //     description,
  //     status,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
  //   const { title, description, status } = updateTaskDto;
  //   const foundTask = this.getTaskById(id);
  //   foundTask.title = title;
  //   foundTask.description = description;
  //   foundTask.status = status;
  //   return foundTask;
  // }
  // deleteTask(id: number): Task[] {
  //   const found = this.getTaskById(id);
  //   if (found) {
  //     return (this.tasks = this.tasks.filter((task) => task.id != id));
  //   } else {
  //     throw new NotFoundException(`Task with Id ${id} Not Found `);
  //   }
  // }
}
