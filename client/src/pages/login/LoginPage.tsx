
import { useContext, useRef } from "react"
import style from "./LoginPage.module.css"
import { AuthContext } from "../../contexts/AuthContexts"
import { useNavigate } from "react-router-dom"
import { ToastPortalContext } from "../../contexts/ToastPortalContext"
import { ToastMode } from "../../types/toast"

export default function LoginPage() {
    
    const navigate = useNavigate()
    
    const authContext = useContext(AuthContext)
    const toastPortalContext = useContext(ToastPortalContext)

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const onLoginHandler = async () => {

        const name = usernameRef.current?.value
        const password = passwordRef.current?.value

        const response = await fetch('/api/user/sign-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                password
            })
        })
        const data = await response.json()
        if (response.ok) {
            authContext?.setAuth({
                id: data.id,
                name: data.name,
                role: data.role,
                isLogin: true
            })
            navigate('/')
        }else {
            toastPortalContext?.addToast({
                message:data.message,
                mode:ToastMode.ERROR
            })
        }
    }

    return (
        <div className={style["login-page"]}>
            <div className={style["login-container"]}>
                <h1 className={style["login-title"]}>התחברות</h1>
                <div className={style["login-form"]}>
                    <div>
                        <label htmlFor="id-number">מספר אישי:</label>
                        <input type="text" name="" id="id-number" placeholder="הכנס מ.א" ref={usernameRef} />
                    </div>
                    <div>
                        <label htmlFor="id-number">סיסמא:</label>
                        <input type="password" name="" id="" placeholder="הכנס סיסמא" ref={passwordRef} />
                    </div>
                    <div>
                        <input type="submit" value="התחבר" onClick={onLoginHandler} />
                    </div>
                </div>
            </div>
        </div>


    )
}