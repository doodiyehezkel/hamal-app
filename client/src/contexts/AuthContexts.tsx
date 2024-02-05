import { createContext, useState } from "react";

export type AuthContextProviderProps = {
    children: React.ReactNode
}

export type AuthProps = {
    id: string
    name: string
    role: string
    isLogin: boolean
}


export type AuthContextProps = {
    auth: AuthProps | null | undefined
    setAuth: Function
}

export const AuthContext = createContext<AuthContextProps | null | undefined>(undefined)

export default function AuthContextProvider(props: AuthContextProviderProps) {

    const [auth, setAuth] = useState<AuthProps>()

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {props.children}
        </AuthContext.Provider>
    )

}