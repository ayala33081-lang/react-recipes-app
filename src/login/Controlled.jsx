import { login } from "../services/auth";
import RecipesList from '../pages/RecipesList'


export function Controlled(){
     if (login){
        return <RecipesList/>
    }

    return(
        <>
        </>
    )
}