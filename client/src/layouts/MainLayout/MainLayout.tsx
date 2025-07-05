// src/layouts/MainLayout.tsx
import React, { useEffect } from "react"; // ייבוא useEffect
import { useTranslation } from "react-i18next";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  // useEffect לטיפול בכיווניות
  useEffect(() => {
    // קבע את הכיווניות לפי השפה הנוכחית
    const direction = i18n.language === "he" ? "rtl" : "ltr";
    document.body.setAttribute("dir", direction);
    // ניתן גם להגדיר את זה על אלמנט ה-html אם רוצים:
    // document.documentElement.setAttribute('dir', direction);

    // פונקציית ניקוי (cleanup) - לא חובה במקרה הזה אבל מומלץ
    return () => {
      // במידה והיית רוצה לאפס לכיווניות ברירת מחדל בעת הסרת הקומפוננטה
      // document.body.removeAttribute('dir');
    };
  }, [i18n.language]); // רנדר מחדש רק כאשר השפה משתנה

  return (
    <div className={styles.appContainer}>
      <h1>{t("appTitle")}</h1>
      <div className={styles.languageButtons}>
        <button
          onClick={() => i18n.changeLanguage("en")}
          style={{ marginRight: "5px" }}
        >
          English
        </button>
        <button onClick={() => i18n.changeLanguage("he")}>עברית</button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
