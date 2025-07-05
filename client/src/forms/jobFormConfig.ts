// src/forms/jobFormConfig.ts
import type { CreateJobDto } from "../interfaces/dto/create-job.dto";

export interface FormField {
  name: keyof CreateJobDto;
  labelKey: string;
  type: "text" | "url" | "date" | "select" | "textarea";
  required?: boolean;
  options?: { value: string; labelKey: string }[];
  // ניתן להוסיף כאן גם וולידציות או הגדרות אחרות
}

export const jobFormFields: FormField[] = [
  {
    name: "companyName",
    labelKey: "formCompanyName",
    type: "text",
    required: true,
  },
  { name: "jobTitle", labelKey: "formJobTitle", type: "text", required: true },
  { name: "jobLink", labelKey: "formJobLink", type: "url" },
  { name: "platform", labelKey: "formPlatform", type: "text", required: true },
  { name: "location", labelKey: "formLocation", type: "text", required: true },
  {
    name: "jobType",
    labelKey: "formJobType",
    type: "select",
    required: true,
    options: [
      { value: "", labelKey: "selectType" },
      { value: "Full-time", labelKey: "fullTime" },
      { value: "Part-time", labelKey: "partTime" },
      { value: "Contract", labelKey: "contract" },
      { value: "Internship", labelKey: "internship" },
    ],
  },
  {
    name: "dateSubmitted",
    labelKey: "formDateSubmitted",
    type: "date",
    required: true,
  },
  {
    name: "status",
    labelKey: "formStatus",
    type: "select",
    required: true,
    options: [
      { value: "", labelKey: "selectStatus" },
      { value: "Applied", labelKey: "applied" },
      { value: "1st Interview", labelKey: "firstInterview" },
      { value: "2nd Interview", labelKey: "secondInterview" },
      { value: "Offer", labelKey: "offer" },
      { value: "Rejected", labelKey: "rejected" },
      { value: "Archived", labelKey: "archived" },
    ],
  },
  { name: "notes", labelKey: "formNotes", type: "textarea" },
];
