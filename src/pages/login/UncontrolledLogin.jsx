import { useActionState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";
import TextField from "../../components/TextField";

/*
תשובה: בדיקה בעת הקלדה לא אפשרית דרך ה
action, כי הוא רץ רק בשליחת הטופס.
אפשר להוסיף onChange או onBlur ידניים לכל שדה, אבל אז צריך state לשגיאות
*/

export default function UncontrolledLogin() {
  const navigate = useNavigate();
  const submitAction = (prevState, formData) => {
  const values = Object.fromEntries(formData);
  const errors = {};

  if (!values.email) errors.email = "אימייל הוא שדה חובה";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "כתובת האימייל אינה תקינה";

  if (!values.password) errors.password = "סיסמא היא שדה חובה";
  else if (values.password.length < 6) errors.password = "הסיסמא חייבת להכיל לפחות 6 תווים";

  if (Object.keys(errors).length > 0) return { values, errors };

  const user = login(values);
  if (!user) return { values, errors: { general: "אימייל או סיסמא שגויים" } };

  navigate("/recipes");
  return { values, errors: {} };
};

const [state, formAction] = useActionState(submitAction, {
  values: { email: "chef@recipes.com", password: "" },
  errors: {},
});
return (
  <form action={formAction} noValidate>
    <TextField label="אימייל" name="email" type="email"
      defaultValue={state.values.email} error={state.errors.email} />
    <TextField label="סיסמא" name="password" type="password"
      defaultValue={state.values.password} error={state.errors.password} />
    {state.errors.general && <p style={{ color: "red" }}>{state.errors.general}</p>}
    <button type="submit">התחברי</button>
  </form>
);
}