import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsOptional() // שדה אופציונלי
  @IsUrl() // מוודא שזהו URL תקין
  jobLink?: string; // ה-? מציין שהשדה אופציונלי ב-TypeScript

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  jobType: string;

  @IsDateString() // מוודא שזו מחרוזת תאריך תקינה (ISO 8601)
  @IsNotEmpty()
  dateSubmitted: string; // נקבל כמחרוזת תאריך

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
