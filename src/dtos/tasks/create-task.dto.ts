import { TaskStatus } from 'src/constants/enums';

export interface CreateTask {
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus;
}
