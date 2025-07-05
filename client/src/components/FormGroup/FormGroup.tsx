// src/components/FormGroup.tsx
import React from "react";
import styles from "./FormGroup.module.css";

interface FormGroupProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode; // מכיל את אלמנט ה-input/select/textarea
}

const FormGroup: React.FC<FormGroupProps> = ({ label, htmlFor, children }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
};

export default FormGroup;
