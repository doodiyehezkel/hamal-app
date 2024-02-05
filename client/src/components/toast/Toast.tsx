import style from './Toast.module.css'

import { ToastMode } from '../../types/toast'

export const Toast = ({id , mode, onClose, message }: {id:string , mode: ToastMode, onClose: (id: string) => void, message: string }) => {

    return (
        <div onClick={()=>onClose(id)} className={`${style['toast']} ${style[mode]}`}>
            <div className={style['message']}>{message}</div>
        </div>
    )
}