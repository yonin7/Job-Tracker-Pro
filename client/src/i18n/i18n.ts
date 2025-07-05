// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ייבוא קובצי התרגום (שניצור בשלב הבא)
import enTranslation from "./locales/en/translation.json";
import heTranslation from "./locales/he/translation.json";

i18n
  // הגדרת מזהה השפה של הדפדפן
  .use(LanguageDetector)
  // העברת מופע i18n ל-react-i18next
  .use(initReactI18next)
  // אתחול i18next
  .init({
    fallbackLng: "en", // שפת ברירת מחדל אם השפה המבוקשת אינה זמינה
    debug: true, // מצב דיבוג - מציג הודעות שימושיות בקונסול
    interpolation: {
      escapeValue: false, // לא לעשות escape ל-HTML בתוך התרגומים (React מטפל בזה)
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      he: {
        translation: heTranslation,
      },
    },
  });

export default i18n;
