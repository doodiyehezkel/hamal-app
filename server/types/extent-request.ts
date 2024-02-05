import { Request } from "express";

export interface ExtentRequest extends Request {
    jwtPayload?:any
}