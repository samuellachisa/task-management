import { TaskStatus } from 'src/constants/enums';

export class UpdateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus;
}
