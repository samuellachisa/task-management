import { Task } from './../entities/tasks.entity';
import { CreateTaskDto } from 'src/dtos/tasks/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/constants/enums';
import { UpdateTaskDto } from 'src/dtos/tasks/update-task.dto';
import { GetTasksFilterDto } from 'src/dtos/tasks/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getAllTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }
  getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id == id);
  }
  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto;
    const foundTask = this.getTaskById(id);
    foundTask.title = title;
    foundTask.description = description;
    foundTask.status = status;
    return foundTask;
  }
  deleteTask(id: number): Task[] {
    return (this.tasks = this.tasks.filter((task) => task.id != id));
  }
}
