// src/jobs/jobs.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { Request } from 'express'; // אם רוצים טיפוס מלא של Request

@Controller('jobs')
// @UseGuards(JwtAuthGuard) // ניתן להגדיר כאן ברמת הקונטרולר כולו
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) // או להגדיר כאן ברמת המתודה אם הגלובלי הוסר
  create(@Body() createJobDto: CreateJobDto, @Req() req) {
    // נקבל את המשתמש דרך ה-Request
    // נניח ש-req.user מכיל את { userId, email } מתוך ה-JwtStrategy
    // בעתיד נצטרך לקשר משרות למשתמש ספציפי
    console.log('User creating job:', req.user);
    return this.jobsService.create(createJobDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard) // או להגדיר כאן
  findAll(@Req() req) {
    console.log('User fetching jobs:', req.user);
    // בעתיד: return this.jobsService.findAllByUserId(req.user.userId);
    return this.jobsService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    console.log('User fetching single job:', req.user);
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req,
  ) {
    console.log('User updating job:', req.user);
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    console.log('User deleting job:', req.user);
    return this.jobsService.remove(id);
  }
}
