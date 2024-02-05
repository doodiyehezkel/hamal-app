import { Request, Response } from 'express';
import { ExtentRequest } from '../types/extent-request';
import { EventModel } from '../models/hamal-model'

export const create = async (req: ExtentRequest, res: Response) => {
    const { area, date, time, reporter, title } = req.body

    try {
        const insertOne = await EventModel.create({ area, date, time, reporter, title })
        res
            .status(201)
            .json(insertOne)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const findAll = async (req: ExtentRequest, res: Response) => {
    
    try {
        const insertOne = await EventModel.find();
        res.status(200).json(insertOne)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const update = async (req: ExtentRequest, res: Response) => {
    const { _id, area, date, time, reporter, title } = req.body
    try {
        const update = await EventModel.findByIdAndUpdate(_id, { area, date, time, reporter, title }, { new: true })
        res.status(201).json(update)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const updateStatus = async (req: ExtentRequest, res: Response) => {
    const { _id, status } = req.body
    try {
        const update = await EventModel.findByIdAndUpdate(_id, { status }, { new: true })
        res.status(201).json(update)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const remove = async (req: ExtentRequest, res: Response) => {
    const { id } = req.params
    try {
        const remove = await EventModel.findByIdAndDelete(id)
        res.status(200).json(remove)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const addNote = async (req: ExtentRequest, res: Response) => {
    const { _id, time, note } = req.body
    try {
        const update = await EventModel.findByIdAndUpdate(_id, { "$push": { notes: { time, note } } }, { new: true })
        res
            .status(200)
            .json(update)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const removeNote = async (req: ExtentRequest, res: Response) => {
    const { eventId, noteId } = req.body
    try {
        const update = await EventModel.findByIdAndUpdate(eventId, { "$pull": { notes: { _id: noteId } } }, { new: true })
        res
            .status(200)
            .json(update)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

export const updateNote = async (req: ExtentRequest, res: Response) => {
    const { eventId, noteId, time, note } = req.body
    try {
        const update = await EventModel.findOneAndUpdate({ _id: eventId, 'notes._id': noteId },
            {
                "$set":
                {
                    'notes.$.time': time,
                    'notes.$.note': note
                }
            },
            { new: true })
        res
            .status(200)
            .json(update)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}
