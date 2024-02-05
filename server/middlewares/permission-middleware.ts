import { NextFunction, Response } from "express";
import { ExtentRequest } from "../types/extent-request";

import { Permission } from "../types/permissions";


const permissionHandlerHelper = (req: ExtentRequest, res: Response, permission: Permission[]) => {
    const { jwtPayload } = req
    if (!jwtPayload) throw new Error(`jwt payload came undefined | null`)
    const { role } = jwtPayload.obj
   
    if (!permission.includes(role)) {
        res.status(403)
        throw new Error("permission denied")
    }
}

const adminPermissionHandler = (req: ExtentRequest, res: Response, next: NextFunction) => {
    permissionHandlerHelper(req ,res ,[Permission.SU])
    next()
}

const readWritePermissionHandler = (req: ExtentRequest, res: Response, next: NextFunction) => {
    permissionHandlerHelper(req ,res ,[Permission.SU ,Permission.RW])
    next()
}

//no need this middleware this is only for been more orginazed 
const readPermissionHandler = (req: ExtentRequest, res: Response, next: NextFunction) => {
    permissionHandlerHelper(req ,res ,[Permission.SU ,Permission.RW ,Permission.R])
    next()
}

export { adminPermissionHandler, readWritePermissionHandler, readPermissionHandler }