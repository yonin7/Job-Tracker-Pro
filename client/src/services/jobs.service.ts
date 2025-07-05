// client/src/services/jobs.service.ts
import api from "./api.service"; // שינוי: ייבוא api במקום axios
import { IJob } from "../interfaces/job.interface";
import { CreateJobDto } from "../interfaces/dto/create-job.dto";

const JOBS_API_URL = "/jobs"; // כתובת ה-API הבסיסית למשרות (כעת יחסית ל-baseURL ב-api.service)

class JobsService {
  async getAllJobs(): Promise<IJob[]> {
    try {
      const response = await api.get<IJob[]>(JOBS_API_URL); // שינוי: שימוש ב-api
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  }

  async createJob(jobData: CreateJobDto): Promise<IJob> {
    try {
      const response = await api.post<IJob>(JOBS_API_URL, jobData); // שינוי
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  }

  async updateJob(id: number, jobData: CreateJobDto): Promise<IJob> {
    try {
      const response = await api.patch<IJob>(`${JOBS_API_URL}/${id}`, jobData); // שינוי
      return response.data;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  }

  async deleteJob(id: number): Promise<void> {
    try {
      await api.delete(`${JOBS_API_URL}/${id}`); // שינוי
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  }
}

export default new JobsService();
