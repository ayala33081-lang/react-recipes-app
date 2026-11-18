import { useState } from "react";
import { Navigate } from "react-router";
import { login } from "../services/auth";

export default function Controlled() {
  const [form, setForm] = useState({ email: "chef@recipes.com", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function validation() {
    const newError = {};
    const regularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regularEmail.test(form.email)) {
      newError.email = "כתובת אימייל לא תקינה";
    }
    if (form.password.length < 6) {
      newError.password = "סיסמא לא תקינה";
    }
    return newError;
  }

  function submit(e) {
    e.preventDefault();

    const newError = validation();
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }

    const user = login(form);
    if (user) {
      setErrors({});
      setIsLoggedIn(true);          // במקום navigate
    } else {
      setErrors({ general: "אימייל או סיסמא שגויים" });
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/recipes" />;
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <label htmlFor="email">email</label>
      <input type="text" name="email" id="email" value={form.email} onChange={change} />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <label htmlFor="password">password</label>
      <input type="password" name="password" id="password" value={form.password} onChange={change} />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <button type="submit">OK</button>
    </form>
  );
}