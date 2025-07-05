// src/services/jobs.service.ts
import axios from "axios";
import type { Job } from "../interfaces/job.interface";
import type { CreateJobDto } from "../interfaces/dto/create-job.dto"; // נוסיף את זה שוב, כי אנחנו משתמשים בו

const API_URL = "http://localhost:3000/jobs";

export const jobsService = {
  // פונקציה לקבלת כל המשרות
  getJobs: async (): Promise<Job[]> => {
    const response = await axios.get<Job[]>(API_URL);
    return response.data;
  },

  // פונקציה לקבלת משרה לפי ID
  getJobById: async (id: string): Promise<Job> => {
    const response = await axios.get<Job>(`${API_URL}/${id}`); // שימו לב כאן לתיקון!
    return response.data;
  },

  // פונקציה ליצירת משרה חדשה
  createJob: async (newJob: CreateJobDto): Promise<Job> => {
    // השתמש ב-CreateJobDto
    const response = await axios.post<Job>(API_URL, newJob);
    return response.data;
  },

  // פונקציה לעדכון משרה
  updateJob: async (
    id: string,
    updatedFields: Partial<CreateJobDto>
  ): Promise<Job> => {
    // השתמש ב-Partial<CreateJobDto>
    const response = await axios.patch<Job>(`${API_URL}/${id}`, updatedFields); // שימו לב כאן לתיקון!
    return response.data;
  },

  // פונקציה למחיקת משרה
  deleteJob: async (id: string): Promise<void> => {
    await axios.delete<void>(`${API_URL}/${id}`); // שימו לב כאן לתיקון!
  },
};
