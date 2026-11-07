import { useParams } from "react-router"

export default function RecipeDetails(){
  const { id } = useParams();

    return(
        <div>
        <h1> פרטי מתכון {id}</h1>
        </div>
    )

} 