import { useForm } from 'react-hook-form'
import Joi from 'joi';
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from 'react-router';
import {login} from '../services/auth'

const schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.empty': 'אימייל הוא שדה חובה',
        'string.email': 'כתובת האימייל אינה תקינה',
    }),
    password:Joi.string().min(6).required()
    .messages({ 
        'string.empty': 'סיסמא היא שדה חובה',
        'string.min': 'סיסמא חיבת להכיל לפחות 6 תוים',
    })
})


export default function Rhf(){

    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        } = useForm({ resolver: joiResolver(schema),
         defaultValues: {
        email: "chef@recipes.com",
        password: ""},
});
    

    function onSubmit(data){
       const user =login(data)

       if(user){
        navigate('/recipes')
       }
       else{
         setError("root", { message: "אימייל או סיסמא שגויים" });
       }
    }
  
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit,(errs) => console.log(errs))} style={{ display: "flex", flexDirection: "column" }}>

            <label htmlFor="email">email</label>
            <input type='text' id="email" placeholder='אימייל...' {...register('email')}/>
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

            <label htmlFor="password">password</label>
            <input type="password" id="password" placeholder='סיסמא...' {...register('password')}/>
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>} 
            <button type='submit'>ok</button>
        </form>
       

        </>
    )
}


