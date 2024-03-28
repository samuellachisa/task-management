import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Task } from '../entities/tasks.entity';
import { CreateTaskDto } from 'src/dtos/tasks/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/tasks/update-task.dto';
import { GetTasksFilterDto } from 'src/dtos/tasks/get-tasks-filter.dto';
import { TasksService } from 'src/services/tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/utility/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.taskService.getAllTasksWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }
  @Patch('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
