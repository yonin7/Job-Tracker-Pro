// src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity'; // אם נרצה לקשר משרות למשתמש

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // אם נרצה לקשר משרות למשתמש ספציפי:
  // @OneToMany(() => Job, job => job.user)
  // jobs: Job[];
}
