import { ToastMode } from "../../types/toast";
import { Toast } from "./Toast";

import style from "./toasts.module.css"

export default function Toasts(
    {
        toasts,
        removeToast
    }: { toasts: { id: string, message: string, mode: ToastMode }[], removeToast: (id: string) => void }) {
    return (
        <div className={style['toasts-container']}>
            {toasts.map(item => (
                <Toast
                    key={item.id}
                    id={item.id}
                    message={item.message}
                    mode={item.mode}
                    onClose={removeToast}
                />
            ))}
        </div>
    )
}