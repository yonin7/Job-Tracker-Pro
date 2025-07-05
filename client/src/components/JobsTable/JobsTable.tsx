import React from "react";
import type { Job } from "../../interfaces/job.interface";
import { useTranslation } from "react-i18next"; // ייבוא זה!
import styles from "./JobsTable.module.css";

interface JobsTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs, onEdit, onDelete }) => {
  const { t } = useTranslation(); // קבל את פונקציית התרגום

  if (jobs.length === 0) {
    return <p>{t("noJobsFound")}</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.jobsTable}>
        <thead>
          <tr>
            <th>{t("company")}</th>
            <th>{t("title")}</th>
            <th>{t("location")}</th>
            <th>{t("status")}</th>
            <th>{t("submitted")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.companyName}</td>
              <td>{job.jobTitle}</td>
              <td>{job.location}</td>
              <td>{job.status}</td>
              <td>{new Date(job.dateSubmitted).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(job)}>{t("edit")}</button>
                <button onClick={() => onDelete(job.id)}>{t("delete")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
