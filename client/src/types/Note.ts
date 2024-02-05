export type NoteType = {
    _id: string
    time: string
    note: string
}

export type NoteProps = {
    eventId: string
    note: NoteType
    onRemoveNoteHandler: Function
    onUpdateNoteHandler: Function
}