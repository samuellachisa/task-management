import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/constants/enums';

export class UpdateTaskDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
