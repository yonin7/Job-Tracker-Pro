// src/interfaces/dto/create-job.dto.ts
// זה DTO ששולחים ל-Backend (חשוב שיתאים ל-Backend DTO שלנו)
export interface CreateJobDto {
  companyName: string;
  jobTitle: string;
  jobLink?: string;
  platform: string;
  location: string;
  jobType: string;
  dateSubmitted: string; // נשלח כמחרוזת תאריך (YYYY-MM-DD)
  status: string;
  notes?: string;
}
