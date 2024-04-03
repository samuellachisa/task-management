import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskssssController');
  constructor(
    private taskService: TasksService,
    private configService: ConfigService,
  ) {
    console.log(this.configService.get('DB_USERNAME'));
  }
  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User) {
    if (Object.keys(filterDto).length) {
      return this.taskService.getAllTasksWithFilter(filterDto, user);
    } else {
      this.logger.verbose(
        `User "${user.username}"all task. Filters: ${JSON.stringify(filterDto)}`,
      );
      return this.taskService.getAllTasks(user);
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: number, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
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
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto, user);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
