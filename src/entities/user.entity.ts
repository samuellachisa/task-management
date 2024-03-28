import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './tasks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  task: Task[];
}
