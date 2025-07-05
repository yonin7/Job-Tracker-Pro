// src/interfaces/job.interface.ts
export interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  jobLink?: string;
  platform: string;
  location: string;
  jobType: string;
  dateSubmitted: string; // נקבל כמחרוזת
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
