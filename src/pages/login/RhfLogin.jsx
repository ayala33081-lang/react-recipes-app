import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";
import { schema } from "../../utils/schema";
import TextField from "../../components/TextField";

export default function RhfLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    defaultValues: { email: "chef@recipes.com", password: "" },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const user = login(data);
    if (!user) {
      setError("root.general", { message: "אימייל או סיסמא שגויים" });
      return;
    }
    navigate("/recipes");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField label="אימייל" type="email"
        {...register("email")} error={errors.email?.message} />
      <TextField label="סיסמא" type="password"
        {...register("password")} error={errors.password?.message} />
      {errors.root?.general && (
        <p style={{ color: "red" }}>{errors.root.general.message}</p>
      )}
      <button type="submit">התחברי</button>
    </form>
  );
}