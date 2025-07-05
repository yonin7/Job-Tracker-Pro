// src/components/JobForm.tsx
import React, { useState, useEffect } from "react";
import type { CreateJobDto } from "../../interfaces/dto/create-job.dto";
import { useTranslation } from "react-i18next";
import FormGroup from "../FormGroup/FormGroup";
import { jobFormFields } from "../../forms/jobFormConfig"; // זהו הייבוא הנכון
import styles from "./JobForm.module.css";

interface JobFormProps {
  onSubmit: (jobData: CreateJobDto) => void;
  initialData?: CreateJobDto;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useTranslation();

  // ... כל ה-useState וה-useEffect ו-handleChange ו-handleSubmit
  const [formData, setFormData] = useState<CreateJobDto>({
    companyName: "",
    jobTitle: "",
    platform: "",
    location: "",
    jobType: "",
    dateSubmitted: "",
    status: "",
    jobLink: undefined,
    notes: undefined,
  });

  // עדכון ה-formData כאשר initialData משתנה (מצב עריכה)
  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || "",
        jobTitle: initialData.jobTitle || "",
        jobLink: initialData.jobLink || undefined,
        platform: initialData.platform || "",
        location: initialData.location || "",
        jobType: initialData.jobType || "",
        dateSubmitted: initialData.dateSubmitted || "",
        status: initialData.status || "",
        notes: initialData.notes || undefined,
      });
    } else {
      // איפוס הטופס אם אין initialData (מצב יצירה חדשה)
      setFormData({
        companyName: "",
        jobTitle: "",
        platform: "",
        location: "",
        jobType: "",
        dateSubmitted: "",
        status: "",
        jobLink: undefined,
        notes: undefined,
      });
    }
  }, [initialData]);

  // מטפל בשינויים בשדות הטופס
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? undefined : value, // שמור undefined עבור שדות אופציונליים ריקים
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedData: CreateJobDto = { ...formData };
    if (submittedData.dateSubmitted) {
      const date = new Date(submittedData.dateSubmitted);
      submittedData.dateSubmitted = date.toISOString().split("T")[0];
    }

    if (submittedData.jobLink === "") submittedData.jobLink = undefined;
    if (submittedData.notes === "") submittedData.notes = undefined;

    onSubmit(submittedData);
  };

  return (
    <form className={styles.jobForm} onSubmit={handleSubmit}>
      <h2>{initialData ? t("editJobTitle") : t("addJobTitle")}</h2>

      {jobFormFields.map(
        (
          field // <-- כאן אתה משתמש ב-jobFormFields המיובא!
        ) => (
          <FormGroup
            key={field.name}
            label={t(field.labelKey)}
            htmlFor={field.name}
          >
            {field.type === "select" ? (
              <select
                id={String(field.name)}
                name={String(field.name)}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={String(field.name)}
                name={String(field.name)}
                value={formData[field.name] || ""}
                onChange={handleChange}
                rows={4}
                required={field.required}
              ></textarea>
            ) : (
              <input
                type={field.type}
                id={String(field.name)}
                name={String(field.name)}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </FormGroup>
        )
      )}

      <button type="submit">
        {initialData ? t("updateJobButton") : t("addJobFormButton")}
      </button>
    </form>
  );
};

export default JobForm;
