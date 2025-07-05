// src/pages/JobsPage.tsx
import React, { useState, useEffect } from "react";
import type { Job } from "../../interfaces/job.interface";
import type { CreateJobDto } from "../../interfaces/dto/create-job.dto";
import { jobsService } from "../../services/jobs.service";
import JobsTable from "../../components/JobsTable/JobsTable";
import JobForm from "../../components/JobForm/JobForm";
import { useTranslation } from "react-i18next";
import styles from "./JobsPage.module.css";

const JobsPage: React.FC = () => {
  const { t } = useTranslation();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>(undefined);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedJobs = await jobsService.getJobs();
      setJobs(fetchedJobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError(t("errorLoadingJobs")); // השתמש בתרגום
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (jobData: CreateJobDto) => {
    try {
      const newJobData = { ...jobData };
      if (newJobData.dateSubmitted) {
        newJobData.dateSubmitted = new Date(newJobData.dateSubmitted)
          .toISOString()
          .split("T")[0];
      }

      if (editingJob) {
        await jobsService.updateJob(editingJob.id, newJobData);
        alert(t("jobUpdatedSuccess"));
        setEditingJob(undefined);
      } else {
        await jobsService.createJob(newJobData);
        alert(t("jobAddedSuccess"));
      }
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      console.error("Failed to save job:", err);
      alert(t("failedToSaveJob"));
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteJob = async (id: string) => {
    if (window.confirm(t("confirmDelete"))) {
      try {
        await jobsService.deleteJob(id);
        alert(t("jobDeletedSuccess"));
        fetchJobs();
      } catch (err) {
        console.error("Failed to delete job:", err);
        alert(t("failedToDeleteJob"));
      }
    }
  };

  if (loading) {
    return <div className={styles.loadingMessage}>{t("loadingJobs")}</div>; // יש לשקול להוציא גם את זה ל-Layout
  }

  if (error) {
    return (
      <div className={styles.errorMessage} style={{ color: "red" }}>
        {error}
      </div>
    ); // יש לשקול להוציא גם את זה ל-Layout
  }

  return (
    <div>
      <button
        className={styles.addJobButton}
        onClick={() => {
          setEditingJob(undefined);
          setShowForm(true);
        }}
      >
        {t("addJobButton")}
      </button>

      {showForm && (
        <div className={styles.formModal}>
          <JobForm onSubmit={handleAddJob} initialData={editingJob} />
          <button
            className={styles.closeFormButton}
            onClick={() => setShowForm(false)}
          >
            {t("closeFormButton")}
          </button>
        </div>
      )}

      <JobsTable
        jobs={jobs}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />
    </div>
  );
};

export default JobsPage;
