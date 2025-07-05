// client/src/services/auth.service.ts
import axios from "axios";

const API_URL = "http://localhost:3000/auth/"; // Base URL for your NestJS auth endpoints

interface LoginResponse {
  access_token: string;
}

interface UserData {
  email: string;
  id?: number;
}

// ממשק חדש עבור מבנה שגיאה צפוי מה-Backend
interface ErrorResponse {
  statusCode: number;
  message: string | string[]; // יכול להיות מחרוזת או מערך של מחרוזות
  error: string;
}

class AuthService {
  async register(email: string, password: string): Promise<UserData> {
    try {
      const response = await axios.post<UserData>(API_URL + "register", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      // שינוי ל-any כדי לגשת ל-response
      console.error("Registration failed:", error);
      // זרוק שוב את השגיאה, אך עם הודעה יותר ספציפית
      throw new Error(this.getErrorMessage(error));
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(API_URL + "login", {
        email,
        password,
      });
      if (response.data.access_token) {
        localStorage.setItem("userToken", response.data.access_token);
      }
      return response.data;
    } catch (error: any) {
      // שינוי ל-any
      console.error("Login failed:", error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  logout(): void {
    localStorage.removeItem("userToken");
  }

  getCurrentUserToken(): string | null {
    return localStorage.getItem("userToken");
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUserToken();
  }

  // מתודה חדשה למיצוי הודעת השגיאה
  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error) && error.response) {
      const errorData: ErrorResponse = error.response.data;
      if (Array.isArray(errorData.message)) {
        return errorData.message.join(", "); // אם יש כמה הודעות, הצג את כולן
      }
      return (
        errorData.message || errorData.error || "An unknown error occurred."
      );
    }
    return error.message || "An unexpected error occurred.";
  }
}

export default new AuthService();
