import { useContext, useRef } from "react"
import style from "./Notes.module.css"
import { NotesType } from '../../../types/Notes'
import Note from '../note/Note'
import { AuthContext } from "../../../contexts/AuthContexts"


export default function Notes(props: NotesType) {
    const authContext = useContext(AuthContext)
    const timeRef = useRef<HTMLInputElement>(null)
    const noteRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            {
                authContext?.auth?.role !== 'r' &&
                <div className={`${style['row']}`}>
                    <div className={`${style['head']}`}>
                        <label >שעה</label>
                        <input type="time" ref={timeRef} />
                    </div>
                    <div className={`${style['head']}`}>
                        <label >הערה</label>
                        <input type="text" ref={noteRef} />
                    </div>
                    <div className={`${style['submit-note']}`}>
                        <button onClick={() => {
                            props.onAddNoteHandler({
                                _id: props._id,
                                time: timeRef.current?.value,
                                note: noteRef.current?.value
                            })
                        }}>הוסף הערה</button>
                    </div>
                </div>
            }
            {
                props.notes.map((note) => {
                    return (
                        <Note
                            key={note._id}
                            eventId={props._id}
                            note={{
                                _id: note._id,
                                time: note.time,
                                note: note.note
                            }}
                            onRemoveNoteHandler={props.onRemoveNoteHandler}
                            onUpdateNoteHandler={props.onUpdateNoteHandler}
                        />
                    )
                })
            }
        </div>
    )
}