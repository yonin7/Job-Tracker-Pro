// client/src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // לניווט לרישום

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // השתמש בפונקציית ההתחברות מ-AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const success = await login(email, password);
      if (!success) {
        setError("ההתחברות נכשלה. אנא בדוק את פרטי הכניסה שלך."); // זו הודעה גנרית אם ה-AuthService מחזיר false
      }
    } catch (err: any) {
      // לכידת השגיאה שזורק ה-AuthService
      setError(err.message || "שגיאה לא צפויה בהתחברות.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          התחבר
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        אין לך חשבון? <Link to="/register">הירשם כאן</Link>
      </p>
    </div>
  );
};

export default LoginPage;
