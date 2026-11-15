import { login } from "../services/auth";
import RecipesList from '../pages/RecipesList'

export function Rhf(){
    if (login){
        return <RecipesList/>
    }
    
    return(
        <>
        </>
    )
}