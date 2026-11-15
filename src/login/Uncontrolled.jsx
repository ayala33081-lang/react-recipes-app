import { login } from "../services/auth";
 import RecipesList from '../pages/RecipesList'


export function Uncontrolled(){
    if (login){
        return <RecipesList/>
    }
    return(
        <>
        </>
    )
}