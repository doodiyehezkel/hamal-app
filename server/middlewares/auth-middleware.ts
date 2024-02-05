import { NextFunction, Request, Response } from "express";
import { ExtentRequest } from "../types/extent-request";
import jwt from 'jsonwebtoken'

const authHandler = (req: ExtentRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies

    if (!token) {
        res.status(401)
        throw new Error('Unauthorized ,no token')
    }

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('secret cant be undefined')

    try {
        const jwtPayload = jwt.verify(token, secret)
        req.jwtPayload = jwtPayload
        next()
    } catch (error:any) {
        res.status(401)
        throw new Error(`Unauthorized - ${error.message}`)
    }   
}

export default authHandler 