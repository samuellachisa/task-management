import { TaskStatus } from 'src/constants/enums';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
