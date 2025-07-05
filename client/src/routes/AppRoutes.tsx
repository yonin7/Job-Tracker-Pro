// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobsPage from "../pages/JobsPage/JobsPage"; // ייבוא עמוד המשרות
import MainLayout from "../layouts/MainLayout/MainLayout"; // ייבוא ה-Layout הראשי

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        {" "}
        {/* עוטף את כל העמודים ב-Layout הראשי */}
        <Routes>
          <Route path="/" element={<JobsPage />} />{" "}
          {/* נתיב ברירת מחדל לעמוד המשרות */}
          {/* בהמשך נוכל להוסיף נתיבים נוספים כמו /login, /register וכו' */}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
