import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // ייבוא TypeOrmModule
import { Job } from './entities/job.entity'; // ייבוא ישות ה-Job

@Module({
  imports: [TypeOrmModule.forFeature([Job])], // מוסיפים את ישות ה-Job למודול
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
