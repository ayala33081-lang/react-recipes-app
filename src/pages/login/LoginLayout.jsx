import { Outlet } from "react-router";

export default function LoginLayout() {
  return (
    <div>
      <h1>התחברות</h1>
      <Outlet />
    </div>
  );
}