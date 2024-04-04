import { TaskRepository } from './../repository/task-repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from '../entities/tasks.entity';
import { getRepositoryToken } from '@nestjs/typeorm'; // Import getRepositoryToken

const mockTaskRepository = () => ({}); // Mock implementation of TaskRepository

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(taskRepository).toBeDefined();
  });
});
