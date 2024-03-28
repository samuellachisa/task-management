import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';
import { TasksController } from '../controllers/tasks.controller';
import { TasksService } from '../services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from 'src/entities/tasks.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
