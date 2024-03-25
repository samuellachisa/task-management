import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/tasks.entity';
import { CreateTaskDto } from 'src/dtos/tasks/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/tasks/update-task.dto';
import { GetTasksFilterDto } from 'src/dtos/tasks/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getAllTasksWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: number): Task {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTasks(createTaskDto);
  }
  @Patch('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.taskService.updateTask(id, updateTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: number): Task[] {
    return this.taskService.deleteTask(id);
  }
}
