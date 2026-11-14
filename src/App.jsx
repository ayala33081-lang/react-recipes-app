import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipeDetails from "./pages/RecipeDetails"
import RecipesList from "./pages/RecipesList";
import LoginLayout from "./pages/login/LoginLayout";
import UncontrolledLogin from "./pages/login/UncontrolledLogin";
import RhfLogin from "./pages/login/RhfLogin";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* ↓ כאן כל אחת מוסיפה את ה־Route שלה ↓ */}
        <Route path="recipes/:id" element={<RecipeDetails/>}/>
        <Route path="recipes" element={<RecipesList />} />
        <Route path="login" element={<LoginLayout />}>
          <Route path="uncontrolled" element={<UncontrolledLogin />} />
          <Route path="rhf" element={<RhfLogin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
