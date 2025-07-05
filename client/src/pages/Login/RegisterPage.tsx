// client/src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // לניווט להתחברות

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { register } = useAuth(); // השתמש בפונקציית הרישום מ-AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const success = await register(email, password);
      if (success) {
        setMessage("הרישום בוצע בהצלחה! אנא התחבר.");
        setEmail("");
        setPassword("");
      } else {
        setError("הרישום נכשל. ייתכן שהמשתמש כבר קיים או שגיאת שרת."); // זו הודעה גנרית אם ה-AuthService מחזיר false
      }
    } catch (err: any) {
      // לכידת השגיאה שזורק ה-AuthService
      setError(err.message || "שגיאה לא צפויה ברישום.");
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
      <h2>רישום</h2>
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
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          הרשמה
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        כבר יש לך חשבון? <Link to="/login">התחבר כאן</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
