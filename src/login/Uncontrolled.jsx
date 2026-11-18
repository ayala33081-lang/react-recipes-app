
import { useActionState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/auth";

export default function Uncontrolled() {
    const navigate = useNavigate()

    function submit(prevState, formData) {
        const objData = Object.fromEntries(formData);
        const errors = {}

        const regularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regularEmail.test(objData.email)) {
            errors.email = "כתובת אימייל לא תקינה"
        }
        if (objData.password.length < 6) {
            errors.password = "סיסמא לא תקינה"
        }

        if (Object.keys(errors).length > 0) {
            return { values: objData, errors }
        }

        const user = login(objData)

        if (user) {
            navigate("/recipes")
            return { values: objData, errors: {} }
        }
        else {
            return { values: objData, errors: { general: "אימייל או סיסמא שגויים" } }
        }
    }

    const [state, formAction] = useActionState(submit, {
        values: { email: "chef@recipes.com", password: "" },
        errors: {}
    })

    return (
        <>
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column' }}>
            {state.errors.general && <p style={{ color: "red" }}>{state.errors.general}</p>}

            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" defaultValue={state.values.email} />
            {state.errors.email && <p style={{ color: "red" }}>{state.errors.email}</p>}

            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" defaultValue={state.values.password} />
            {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}

            <button type="submit">OK</button>
        </form>
        </>
    )
}
    
   