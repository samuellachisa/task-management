import { TaskStatus } from 'src/constants/enums';
import { IsNotEmpty, IsEnum } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
