import { useToastPortal } from "../hook/use-toast-portal"
import ReactDOM from "react-dom";
import { createContext, useEffect, useState } from "react";
import { ToastMode } from "../types/toast";
import { v4 as uuidv4 } from 'uuid';
import Toasts from "../components/toast/Toasts";



export type ToastsContextProps = {
    addToast: (toast: { message: string, mode: ToastMode }) => void
}

export const ToastPortalContext = createContext<ToastsContextProps | null | undefined>(undefined)

export const ToastPortalContextProvider = (
    {
        autoClose,
        autoCloseTime,
        children
    }
        :
        {
            autoClose: boolean,
            autoCloseTime: number,
            children: React.ReactNode
        }
) => {
    const { loaded, protalId } = useToastPortal()
    const [toasts, setToasts] = useState<{ id: string, message: string, mode: ToastMode }[]>([])

    const [removing, setRemoving] = useState('')

    useEffect(()=>{
        if(removing)
            setToasts(toasts.filter(item => item.id !== removing))
    },[removing])

    useEffect(() => {
        if (autoClose && toasts.length) {
            const id = toasts[toasts.length - 1].id
            setTimeout(() => setRemoving(id), autoCloseTime)
        }
    }, [toasts, autoClose, autoCloseTime])


    const removeToast = (id: string) => {
        setToasts(toasts.filter(item => item.id !== id))
    }

    const addToast = (toast: { message: string, mode: ToastMode }): void => {
        setToasts([...toasts, { ...toast, id: uuidv4() }])
    }

    return (
        <ToastPortalContext.Provider value={{ addToast }}>
            {loaded ?
                ReactDOM.createPortal(
                    <Toasts toasts={toasts} removeToast={removeToast} />,
                    document.getElementById(protalId)!)
                :
                <></>
            }
            {children}
        </ToastPortalContext.Provider>
    )
}