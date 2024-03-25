import { Injectable } from '@nestjs/common';
import { Task } from 'src/entities/tasks.entity';
import { Repository } from 'typeorm';

Injectable();
export class TaskRepository extends Repository<Task> {}
