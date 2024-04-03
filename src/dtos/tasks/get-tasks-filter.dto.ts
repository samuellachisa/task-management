import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/constants/enums';

export class GetTasksFilterDto {
  @IsOptional()
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
