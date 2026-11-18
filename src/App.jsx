import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipeDetails from "./pages/RecipeDetails"
import RecipesList from "./pages/RecipesList";
import Controlled from "./login/Controlled";
import Uncontrolled from "./login/Uncontrolled"
import Rhf from "./login/Rhf"


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes/:id" element={<RecipeDetails/>}/>
        <Route path="recipes" element={<RecipesList />} />
        <Route path="login/controlled" element={<Controlled/>}/>
        <Route path="login/uncontrolled" element={<Uncontrolled/>}/>
        <Route path="login/rhf" element={<Rhf/>}/>
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  );
}
