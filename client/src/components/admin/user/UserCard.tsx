
import { useRef, useState } from "react"
import { UserProps } from "../../../types/user"
import style from "./UserCard.module.css"

export default function UserCard(props: UserProps) {

    const [selectedPermission, setSelectedPermission] = useState(props.role)
    const [editMode, setEditMode] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)

    const onSaveHandler = () => {
        if (!nameRef.current) throw new Error("name can't be undefined | null")
        props.onUpdateUserHandler(props._id, nameRef.current?.value, selectedPermission)
        setEditMode(false)
    }


    const roleTranslate = () => {
        switch (props.role) {
            case 'r':
                return "קריאה"
            case 'rw':
                return "כתיבה"
            case 'su': 
                return "מנהל"
            default:
                break;
        }
    }


    return (
        !editMode
            ?
            <>
                <div>
                    מספר אישי: {props.name}
                </div>
                <div>
                    הרשאות: { roleTranslate() }
                </div>
                <div>
                    <button onClick={() => setEditMode(prev => !prev)}>עריכה</button>
                    <button onClick={() => props.onDeleteUserHandler(props._id)}>מחיקה</button>
                </div>
            </>
            :
            <>
                <div>
                    מספר אישי: <input type="text" defaultValue={props.name} ref={nameRef} />
                </div>
                <div>
                    הרשאות:
                    <label htmlFor="">
                        <input
                            type="radio"
                            value={'r'}
                            onChange={(e) => setSelectedPermission(e.currentTarget.value)}
                            id=""
                            checked={selectedPermission === 'r'}
                        />
                        קריאה
                    </label>
                    <label htmlFor="">
                        <input
                            type="radio"
                            value={'rw'}
                            onChange={(e) => setSelectedPermission(e.currentTarget.value)}
                            id=""
                            checked={selectedPermission === 'rw'}
                        />
                        כתיבה
                    </label>
                    <label htmlFor="">
                        <input
                            type="radio"
                            value={'su'}
                            onChange={(e) => setSelectedPermission(e.currentTarget.value)}
                            id=""
                            checked={selectedPermission === 'su'}
                        />
                        מנהל
                    </label>
                </div>
                <div>
                    <button onClick={() => setEditMode(prev => !prev)}>ביטול</button>
                    <button onClick={onSaveHandler}>שמירה</button>
                </div>
            </>
    )
}