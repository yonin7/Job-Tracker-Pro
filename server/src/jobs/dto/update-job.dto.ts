import { PartialType } from '@nestjs/mapped-types'; // מייבא PartialType
import { CreateJobDto } from './create-job.dto'; // מייבא את CreateJobDto

// PartialType הופך את כל השדות ב-CreateJobDto לאופציונליים
// זה שימושי לעדכון, כי לא חייבים לעדכן את כל השדות
export class UpdateJobDto extends PartialType(CreateJobDto) {}
