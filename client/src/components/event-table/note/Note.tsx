import { useState, useRef, useContext } from 'react'
import { NoteProps } from '../../../types/Note'
import style from './Note.module.css'
import { AuthContext } from '../../../contexts/AuthContexts'

export default function Note(props: NoteProps) {

    const authContext = useContext(AuthContext)

    const [editMode, setEditMode] = useState(false)
    const timeRef = useRef<HTMLInputElement>(null)
    const noteRef = useRef<HTMLInputElement>(null)

    return (
        <div key={props.note._id} className={style['row']}>
            {
                editMode
                    ?
                    <>
                        <div className={style['col']}>
                            <input type="time" ref={timeRef} />
                        </div>
                        <div className={style['col']}>
                            <input type="text" defaultValue={props.note.note} ref={noteRef} />
                        </div>
                        <div className={style['buttons']}>
                            <button onClick={() => setEditMode(false)}>ביטול</button>
                            <button onClick={() => {
                                props.onUpdateNoteHandler(
                                    props.eventId,
                                    props.note._id,
                                    timeRef.current?.value,
                                    noteRef.current?.value
                                )
                                setEditMode(false)
                            }}>שמירה</button>
                        </div>
                    </>
                    :
                    <>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p>{props.note.time}</p>
                        </div>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p>{props.note.note}</p>
                        </div>
                        {
                            authContext?.auth?.role !== 'r' &&
                            <div className={style['buttons']}>
                                <button onClick={() => props.onRemoveNoteHandler(props.eventId, props.note._id)}>מחק</button>
                                <button onClick={() => setEditMode(true)}>עריכה</button>
                            </div>
                        }

                    </>
            }
        </div>
    )
}