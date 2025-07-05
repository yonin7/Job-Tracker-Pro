// client/src/services/api.service.ts
import axios from "axios";
import AuthService from "./auth.service"; // ייבוא AuthService

const api = axios.create({
  baseURL: "http://localhost:3000/", // כתובת הבסיס של כל ה-Backend
});

// Axios Interceptor
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getCurrentUserToken(); // קבל את הטוקן מה-AuthService
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // צרף את הטוקן לכותרת Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// אופציונלי: Interceptor לתגובות (לטיפול ב-401/403 גלובלי)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      // אם קיבלנו 401 (Unauthorized), נתק את המשתמש
      // זה ינתב אותו לדף ההתחברות
      AuthService.logout();
      // ייתכן ותרצה להוסיף כאן הודעה למשתמש, למשל עם Toast
    }
    return Promise.reject(error);
  }
);

export default api;
