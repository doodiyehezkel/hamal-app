import { FormEvent, useRef, useState } from "react"
import style from "./CreateUserForm.module.css"

import { CreateUserFormProps } from "../../../types/user"

export default function CreateUserForm(props: CreateUserFormProps) {

    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const roleRef = useRef<HTMLSelectElement>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')



    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
       
        if (
            nameRef &&  nameRef.current && nameRef.current.value &&
            passwordRef && passwordRef.current &&  passwordRef.current.value &&
            roleRef && roleRef.current && roleRef.current.value
        ) {
            props.onSubmitHandler(nameRef.current?.value, passwordRef.current?.value, roleRef.current?.value)
        }

        else {
            setErrorMessage('יש למלא את כל השדות הנדרשים')
        }
        
    }

    return (
        <form className={style["create-user-form"]} onSubmit={(e: FormEvent) => onSubmitHandler(e)} >
            <h1 className={style["create-user-title"]}>יצירת יוזר</h1>
            <div className={style["create-user-input"]}>
                <label htmlFor="id-number">מספר אישי:</label>
                <input type="text" name="" id="id-number" placeholder="מ.א" ref={nameRef} />
            </div>
            <div className={style["create-user-input"]}>
                <label htmlFor="password">סיסמא:</label>
                <input type="password" name="" id="password" placeholder="סיסמא" ref={passwordRef} />
            </div>
            <div className={style["create-user-input"]}>
                <label htmlFor="">הרשאות:</label>
                <select name="" id="" ref={roleRef}>
                    <option value="r">קריאה</option>
                    <option value="w">כתיבה</option>
                    <option value="su">מנהל</option>
                </select>
            </div>
            <div className={style["create-user-submit"]}>
                <input type="submit" value="צור יוזר" />
            </div>
            <div className={style["error-message-container"]}>
                {
                    errorMessage && <p className={style["error-message"]}> {errorMessage} </p>
                }
            </div>
        </form>
    )
}