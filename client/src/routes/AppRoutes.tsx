// client/src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ייבוא Navigate
import JobsPage from "../pages/JobsPage/JobsPage"; // בהנחה שזהו דף המשרות שלך
import LoginPage from "../pages/Login/LoginPage"; // דף ההתחברות החדש שלך
import RegisterPage from "../pages/Login/RegisterPage"; // דף הרישום החדש שלך
import MainLayout from "../layouts/MainLayout/MainLayout"; // ה-MainLayout הקיים שלך
import { useAuth } from "../context/AuthContext"; // ייבוא הוק useAuth

// קומפוננטת עטיפה לנתיבים מוגנים
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // השתמש ב-isAuthenticated ו-logout מהקונטקסט

  return (
    <MainLayout>
      {" "}
      {/* ה-layout הראשי שלך עוטף את כל הנתיבים */}
      <div style={{ padding: "20px" }}>
        {isAuthenticated && ( // כפתור יציאה פשוט למשתמשים מאומתים
          <button
            onClick={logout}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            התנתק
          </button>
        )}
        <Routes>
          {/* נתיבים ציבוריים */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/jobs" replace />} />{" "}
          {/* ניווט מחדש מהשורש למשרות או להתחברות */}
          {/* נתיבים מוגנים */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />
          {/* הוסף כאן נתיבים מוגנים נוספים לפי הצורך */}
          {/* נתיב קליטת כל השאר עבור נתיבים לא מוגדרים */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default AppRoutes;
