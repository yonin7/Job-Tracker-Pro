// src/jobs/entities/job.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // ודא שאתה מייבא גם CreateDateColumn ו-UpdateDateColumn

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  jobTitle: string;

  @Column({ nullable: true })
  jobLink: string;

  @Column()
  platform: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column({ type: 'date' }) // 'date' ב-SQLite נשמר כ-TEXT (YYYY-MM-DD)
  dateSubmitted: Date;

  @Column()
  status: string;

  // השתמש ב-CreateDateColumn עבור createdAt - זה הטוב ביותר ב-TypeORM
  @CreateDateColumn({ type: 'datetime' }) // זה נראה תקין
  createdAt: Date;

  // שנה את זה מ-timestamp ל-datetime והשתמש ב-UpdateDateColumn
  @UpdateDateColumn({ type: 'datetime' }) // <-- השינוי כאן!
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // TODO: בהמשך נוסיף שדה user_id לקישור למשתמש שיצר את המשרה
  // @Column()
  // userId: string;
}
