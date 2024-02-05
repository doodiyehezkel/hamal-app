import { useContext, useEffect, useState } from "react"
import HeaderTable from "../../components/event-table/header/HeaderTable"
import RowTable, { eventProps } from "../../components/event-table/row/RowTable"
import { NoteType } from '../../types/Note'
import { AuthContext } from "../../contexts/AuthContexts"
import { ToastPortalContext } from "../../contexts/ToastPortalContext"
import { ToastMode } from "../../types/toast"

export default function EventTablePage() {

    const authContext = useContext(AuthContext)
    const toastPortalContext = useContext(ToastPortalContext)


    const [events, setEvents] = useState<eventProps[]>([])

    useEffect(() => {
        fetch('/api/find-all')
            .then(response => response.json())
            .then(json => {
                json.sort((a: eventProps, b: eventProps) => Number(b.status) - Number(a.status))
                setEvents(json)
            })
            .catch(error => console.log(error))
    }, [])

    const onCreateHandler = async (data: eventProps) => {
        const { area, reporter, date, time, title } = data
        if (!area || !reporter || !date || !time || !title) {
            toastPortalContext?.addToast(
                {
                    message: 'יש למלא את כל השדות',
                    mode: ToastMode.ERROR
                }
            )
            return
        }
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            const newEvent = await response.json()
            const allEvents = [...events, newEvent]
            allEvents.sort((a: eventProps, b: eventProps) => Number(b.status) - Number(a.status))
            setEvents(allEvents)
        }
    }

    const onDeleteHandler = async (id: string) => {
        const response = await fetch(`/api/remove/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const eventsFilter = events.filter(event => event._id !== id)
            setEvents(eventsFilter)
        }
    }

    const onUpdateHandler = async (data: eventProps) => {
        const response = await fetch(`/api/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            const newUpdate = await response.json()
            const eventsUpdate = events.map(event => {
                if (event._id === data._id) return newUpdate
                return event
            })
            setEvents(eventsUpdate)
        }

    }

    const onAddNoteHandler = async (note: NoteType) => {

        const response = await fetch(`/api/add-note`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note)
        })

        if (response.ok) {
            const newNote = await response.json()
            const eventsUpdate = events.map(event => {
                if (event._id === note._id) return newNote
                return event
            })
            setEvents(eventsUpdate)
        }
    }

    const onRemoveNoteHandler = async (eventId: string, noteId: string) => {

        const response = await fetch(`/api/remove-note`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId, noteId })
        })

        if (response.ok) {
            const newNote = await response.json()
            const eventsUpdate = events.map(event => {
                if (event._id === eventId) return newNote
                return event
            })
            setEvents(eventsUpdate)
        }
    }

    const onUpdateNoteHandler = async (eventId: string, noteId: string, time: string, note: string) => {
        const response = await fetch(`/api/update-note`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId, noteId, time, note })
        })

        if (response.ok) {
            const newNote = await response.json()
            const eventsUpdate = events.map(event => {
                if (event._id === eventId) return newNote
                return event
            })
            setEvents(eventsUpdate)
        }
    }

    const onCloseEventHandler = async (id: string) => {
        const response = await fetch(`/api/update-status`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
                status: false
            })
        })

        if (response.ok) {
            const newUpdate = await response.json()
            const eventsUpdate = events.map(event => {
                if (event._id === id) return newUpdate
                return event
            })
            eventsUpdate.sort((a: eventProps, b: eventProps) => Number(b.status) - Number(a.status))
            setEvents(eventsUpdate)
        }
    }

    return (
        <div>
            {
                authContext?.auth?.role !== 'r' &&
                <>
                    <HeaderTable onCreateHandler={onCreateHandler} />
                    <hr />
                </>
            }
            {events.map(event => {
                return (<RowTable
                    key={event._id}
                    event={{
                        _id: event._id,
                        area: event.area,
                        time: event.time,
                        date: event.date,
                        title: event.title,
                        status: event.status,
                        reporter: event.reporter,
                        notes: event.notes,
                    }}
                    onDeleteHandler={onDeleteHandler}
                    onUpdateHandler={onUpdateHandler}
                    onAddNoteHandler={onAddNoteHandler}
                    onRemoveNoteHandler={onRemoveNoteHandler}
                    onUpdateNoteHandler={onUpdateNoteHandler}
                    onCloseEventHandler={onCloseEventHandler}
                />
                )
            })}
        </div>
    )
}