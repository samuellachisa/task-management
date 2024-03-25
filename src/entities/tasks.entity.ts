import { TaskStatus } from 'src/constants/enums';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
