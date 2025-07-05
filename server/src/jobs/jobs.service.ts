import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity'; // ייבוא ישות ה-Job
import { CreateJobDto } from './dto/create-job.dto'; // ייבוא DTO ליצירה (ניצור בהמשך)
import { UpdateJobDto } from './dto/update-job.dto'; // ייבוא DTO לעדכון (ניצור בהמשך)

@Injectable()
export class JobsService {
  constructor(
    // הזרקת ה-Repository של Job לתוך ה-Service
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // יצירת משרה חדשה
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto); // יוצר אובייקט Job חדש מה-DTO
    return await this.jobRepository.save(job); // שומר את האובייקט במסד הנתונים
  }

  // קבלת כל המשרות
  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find(); // מחזיר את כל המשרות מהטבלה
  }

  // קבלת משרה ספציפית לפי ID
  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } }); // מחפש משרה לפי ID
    if (!job) {
      throw new NotFoundException(`Job with ID "${id}" not found`); // זורק שגיאה אם המשרה לא נמצאה
    }
    return job;
  }

  // עדכון משרה קיימת
  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id); // מוודא שהמשרה קיימת
    this.jobRepository.merge(job, updateJobDto); // ממזג את הנתונים החדשים לאובייקט הקיים
    return await this.jobRepository.save(job); // שומר את השינויים
  }

  // מחיקת משרה
  async remove(id: string): Promise<void> {
    const result = await this.jobRepository.delete(id); // מוחק משרה לפי ID
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID "${id}" not found`); // זורק שגיאה אם המשרה לא נמצאה (לא נמחקו שורות)
    }
  }
}
