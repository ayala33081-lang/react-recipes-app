import { useEffect, useState } from "react";
import {useParams,Link } from "react-router"
import NotFound from "./NotFound";

export default function RecipeDetails(){
  const { id } = useParams();
  const [recipe,setRecipe]=useState(null) 
  const [loading ,setLoading]=useState(true)
  const [error ,setError]=useState('')

  useEffect(()=>{
    setLoading(true)
    setError('')
    
    fetch(`https://dummyjson.com/recipes/${id}`)
        .then(res=>{
            if (!res.ok) {
                    throw new Error('Recipe not found');
                    }
            return res.json()})
        .then(data=>setRecipe(data))
        .catch(error=>setError(error.message))
        .finally(()=>{setLoading(false)}) 

    },[id]);

    if(loading===true){
        return <p>טוען נתונים...</p>
    }
    if(error!=''){
        return <NotFound/>
    }
    return(
        <div>
        <Link to='/recipes'>חזרה לרשימה</Link>
        <h1>{recipe?.name}</h1>
        <h2>זמן הכנה:{recipe?.prepTimeMinutes} | זמן בישול: {recipe?.cookTimeMinutes} |מנות : {recipe?.servings} |רמת קושי: {recipe?.difficulty} </h2>
        <img src={recipe?.image} alt={recipe?.name} width={300}></img>
        <h3>מצרכים :</h3>
        <ul>
            {recipe?.ingredients.map((st,index)=><li key={index}>{st}</li>)}
        </ul>
        <h3>הוראות הכנה :</h3>
        <ol>
            {recipe?.instructions.map((st,index)=><li key={index}>{st}</li>)}
        </ol>
        <Link to={`/recipes/${Number(id)+1}`}>המתכון הבא </Link>

        </div>
    )

} 