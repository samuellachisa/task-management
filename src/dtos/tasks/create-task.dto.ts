import { TaskStatus } from 'src/constants/enums';

export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus.OPEN;
}
