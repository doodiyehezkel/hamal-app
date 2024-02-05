import { useState, useRef, useContext } from 'react'
import Notes from '../notes/Notes'
import style from './RowTable.module.css'
import { NoteType } from '../../../types/Note'
import { AuthContext } from '../../../contexts/AuthContexts'

export type eventProps = {
    _id: string
    area: string
    date: string
    time: string
    reporter: string
    title: string
    status: Boolean
    notes: [NoteType]
}

export type RowTableProps = {
    event: eventProps
    onDeleteHandler: Function
    onUpdateHandler: Function
    onAddNoteHandler: Function
    onRemoveNoteHandler: Function
    onUpdateNoteHandler: Function
    onCloseEventHandler: Function
}

export default function RowTable(props: RowTableProps) {

    const authContext = useContext(AuthContext)

    const [editMode, setEditMode] = useState(false)
    const [extendsMode, setExtendsMode] = useState(false)

    const areaRef = useRef<HTMLSelectElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)
    const reporterRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)

    return (

        <div className={`${style['row-container']} ${props.event.status ? style['col-active'] : style['col-not-active']}`}>
            {
                editMode
                    ?
                    <div className={style['row']}>
                        <div className={style['col']}>
                            <select defaultValue={props.event.area} ref={areaRef}>
                                <option value="צפון">צפון</option>
                                <option value="מרכז">מרכז</option>
                                <option value="דרום">דרום</option>
                            </select>
                        </div>
                        <div className={style['col']}>
                            <input type="date" defaultValue={props.event.date} ref={dateRef} />
                        </div>
                        <div className={style['col']}>
                            <input type="time" defaultValue={props.event.time} ref={timeRef} />
                        </div>
                        <div className={style['col']}>
                            <input type="text" defaultValue={props.event.reporter} ref={reporterRef} />
                        </div>
                        <div className={style['col']}>
                            <input type="text" defaultValue={props.event.title} ref={titleRef} />
                        </div>
                        <div className={style['btn']}>
                            <button onClick={() => {
                                props.onUpdateHandler({
                                    _id: props.event._id,
                                    area: areaRef.current?.value,
                                    date: dateRef.current?.value,
                                    time: timeRef.current?.value,
                                    reporter: reporterRef.current?.value,
                                    title: titleRef.current?.value
                                })
                                setEditMode(false)
                            }}>שמירה</button>
                            <button onClick={() => setEditMode(prev => !prev)}>ביטול</button>
                        </div>
                    </div>

                    :

                    <div className={style['row']}>
                        <div className={style['extends-btn']}>
                            <button onClick={() => setExtendsMode(prev => !prev)}>{extendsMode ? '-' : '+'}</button>
                        </div>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p>{props.event.area}</p>
                        </div>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p>{props.event.date}</p>
                        </div>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p>{props.event.time}</p>
                        </div>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p>{props.event.reporter}</p>
                        </div>
                        <div className={`${style['col']} ${style['col-bgc']}`}>
                            <p> {props.event.title} </p>
                        </div>
                        {
                            authContext?.auth?.role !== 'r' && 
                            <div className={style['btn']}>
                                <button onClick={() => props.onDeleteHandler(props.event._id)}>מחק</button>
                                <button onClick={() => setEditMode(prev => !prev)}>עריכה</button>
                                <button onClick={() => props.onCloseEventHandler(props.event._id)}>סגירת דיווח</button>
                            </div>
                        }
                        
                    </div>
            }
            <div>
                {extendsMode &&
                    <Notes
                        key={props.event._id}
                        _id={props.event._id}
                        notes={props.event.notes}
                        onAddNoteHandler={props.onAddNoteHandler}
                        onRemoveNoteHandler={props.onRemoveNoteHandler}
                        onUpdateNoteHandler={props.onUpdateNoteHandler}
                    />
                }
            </div>
        </div>
    )
}