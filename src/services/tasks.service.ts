import { Task } from './../entities/tasks.entity';
import { CreateTaskDto } from 'src/dtos/tasks/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from 'src/dtos/tasks/update-task.dto';
import { GetTasksFilterDto } from 'src/dtos/tasks/get-tasks-filter.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  // private tasks: Task[] = [];
  async getAllTasks(user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    return await query.getMany();
  }

  async getAllTasksWithFilter(filterDto: GetTasksFilterDto, user: User) {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: +id } });
    if (!found) {
      throw new NotFoundException(`Task with Id ${id} Not Found `);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, status } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status,
      user,
    });
    await this.taskRepository.save(task);
    return task;
  }
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log('result', result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} Not Found `);
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    const foundTask = await this.getTaskById(id);
    if (foundTask) {
      foundTask.title = title;
      foundTask.description = description;
      foundTask.status = status;

      const updatedTask = await this.taskRepository.save(foundTask);
      return updatedTask;
    } else {
      throw new Error(`Task with ID ${id} not found.`);
    }
  }
}
