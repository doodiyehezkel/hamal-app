import { NoteType } from "./Note"
export type NotesType = {
    _id: string
    notes: [NoteType]
    onAddNoteHandler: Function
    onRemoveNoteHandler: Function
    onUpdateNoteHandler: Function
}