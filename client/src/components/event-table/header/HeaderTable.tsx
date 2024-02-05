import { useRef } from 'react'
import style from "./HeaderTable.module.css"

type HeaderTableProps = {
    onCreateHandler: Function
}

export default function HeaderTable(props: HeaderTableProps) {

    const areaRef = useRef<HTMLSelectElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)
    const reporterRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    
    
    return (
        <div className={style['row']}>
             <div className={style['col']}>
                <label>פיקוד:</label>
                <select ref={areaRef} >
                    <option value=""></option>
                    <option value="צפון">צפון</option>
                    <option value="מרכז">מרכז</option>
                    <option value="דרום">דרום</option>
                </select>
            </div>
            <div className={style['col']}>
                <label>תאריך:</label>
                <input type="date" ref={dateRef} />
            </div>
            <div className={style['col']}>
                <label>שעה:</label>
                <input type="time" ref={timeRef} />
            </div>
            <div className={style['col']}>
                <label>גורם מדווח:</label>
                <input type="text" ref={reporterRef} />
            </div>
            <div className={style['col']}>
                <label>ארוע:</label>
                <input type="text" ref={titleRef} />
            </div>
            <div className={style['submit-btn']} >
                <button onClick={() => props.onCreateHandler({
                    area:areaRef.current?.value,
                    date: dateRef.current?.value,
                    time: timeRef.current?.value,
                    reporter: reporterRef.current?.value,
                    title: titleRef.current?.value
                })}>הוסף ארוע</button>
            </div>
        </div>
    )
}