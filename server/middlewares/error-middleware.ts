import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500
    if (err instanceof mongoose.Error.ValidationError) statusCode = 400
    res
        .status(statusCode)
        .json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        })
}

export default errorHandler