import mongoose, { Schema } from 'mongoose';

const noteShema = new Schema({
    time: {
        type: String,
        required: [true, 'Please enter note time']
    },
    note: {
        type: String,
        required: [true, 'Please enter note text']
    }
})

const eventSchema = new Schema({
    area: {
        type: String,
        enum: ['צפון', 'מרכז', 'דרום'],
        required: [true ,'Please enter area']
    },
    date: {
        type: String,
        required: [true ,'Please enter date']
    },
    time: {
        type: String,
        required: [true ,'Please enter time']
    },
    reporter: {
        type: String,
        required: [true ,'Please enter reporter']
    },
    title: {
        type: String,
        required: [true ,'Please enter title']
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    },
    notes: {
        type: [noteShema]
    }
})


export const EventModel = mongoose.model('Event', eventSchema)