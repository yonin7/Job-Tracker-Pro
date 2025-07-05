// client/src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/auth.service"; // ייבוא שירות האימות שלך
import { useNavigate } from "react-router-dom"; // לייבוא עבור ניווט מחדש לאחר אימות

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null; // לאחסון כתובת האימייל של המשתמש המחובר
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthService.isAuthenticated()
  );
  const [userEmail, setUserEmail] = useState<string | null>(null); // נצטרך לאחסן אימייל מהטוקן או מתגובת ההתחברות
  const navigate = useNavigate(); // Hook לניווט

  // באפליקציה אמיתית, היית מפענח את הטוקן כדי לקבל את userEmail או מביא נתוני משתמש
  // כרגע, נניח שהאימייל מגיע מתגובת ההתחברות או מועבר
  useEffect(() => {
    // כאן ייתכן ותרצה לפענח את הטוקן כדי לקבל את כתובת האימייל של המשתמש אם הוא מאוחסן
    // או להביא פרטי משתמש אם הטוקן תקף
    const token = AuthService.getCurrentUserToken();
    if (token) {
      // פלייסהולדר פשוט: באפליקציה אמיתית, היית מפענח את הטוקן
      // או מבצע בקשה לנקודת קצה /profile כדי לקבל פרטי משתמש בצורה מאובטחת.
      // כרגע, נגדיר אותו לערך פיקטיבי או מניסיון התחברות קודם.
      // כדי לקבל את האימייל מהטוקן, תזדקק לספריית פענוח JWT או לנקודת קצה ב-Backend.
      setIsAuthenticated(true);
      // setUserEmail('example@user.com'); // פלייסהולדר עד שנוכל לקבל אימייל באופן אמין
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await AuthService.login(email, password);
      if (response.access_token) {
        setIsAuthenticated(true);
        setUserEmail(email); // הגדר אימייל מקלט ההתחברות כרגע
        navigate("/jobs"); // ניווט מחדש לדף המשרות לאחר התחברות מוצלחת
        return true;
      }
      return false;
    } catch (error) {
      console.error("ההתחברות נכשלה:", error);
      setIsAuthenticated(false);
      setUserEmail(null);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await AuthService.register(email, password);
      if (response.id) {
        // בהנחה שהרישום מחזיר ID
        // לאחר רישום מוצלח, ייתכן ותרצה ללוגן אוטומטית את המשתמש
        // או לנתב מחדש לדף ההתחברות
        console.log("הרישום בוצע בהצלחה:", response);
        navigate("/login"); // ניווט מחדש להתחברות לאחר רישום מוצלח
        return true;
      }
      return false;
    } catch (err: any) {
      // ייתכן שתקבל הודעות שגיאה ספציפיות מהבקאנד כאן
      setError(
        err.response?.data?.message || "אירעה שגיאה בלתי צפויה במהלך הרישום."
      );
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUserEmail(null);
    navigate("/login"); // ניווט מחדש לדף ההתחברות לאחר יציאה
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userEmail, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook מותאם אישית לשימוש ב-AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth חייב לשמש בתוך AuthProvider");
  }
  return context;
};
