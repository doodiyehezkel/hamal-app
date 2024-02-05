import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { ExtentRequest } from '../types/extent-request'


const generateToken = (obj: any) => {

    const jwt_secret = process.env.JWT_SECRET

    if (!jwt_secret) throw new Error(`jwt_secret can't be undefined`)

    return jwt.sign({ obj }, jwt_secret, {
        expiresIn: '3h'
    })

}

const signUp = expressAsyncHandler(async (req: Request, res: Response) => {

    const { name, password, role } = req.body

    if (!password) {
        res.status(400)
        throw new Error('Please enter user password')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({
        name,
        password: hashedPassword,
        role
    })

    res
        .status(201)
        .json({
            id: user.id,
            name: user.name,
            role: user.role,
        })

})

const signIn = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, password } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Please enter user name')
    }

    if (!password) {
        res.status(400)
        throw new Error('Please enter user password')
    }

    const user = await UserModel.findOne({ name })
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400)
        throw new Error(`Invalid credentials`)
    }

    const token = generateToken(user)

    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 1000 * 6000 })

    res.status(200)
        .json({
            id: user.id,
            name: user.name,
            role: user.role,
        })

})

const signOut = expressAsyncHandler(async (req: Request, res: Response) => {
    res
        .clearCookie('token')
        .status(200)
        .json({})
})

const ping = expressAsyncHandler(async (req: Request, res: Response) => {

    const { token } = req.cookies
    if (!token) {
        res.status(401)
        throw new Error('Unauthorized ,no token')
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
        res.status(401)
        throw new Error('secret cant be undefined')
    }

    try {
        const jwtPayload = jwt.verify(token, secret)
        res.status(200).json(jwtPayload)
    } catch (error) {
        res.status(401).json({})
    }

})

const getAllUsers = expressAsyncHandler(async (req: ExtentRequest, res: Response) => {
    const users = await UserModel.find()
    res.status(200)
        .json(users)
})

const updateUser = expressAsyncHandler(async (req: ExtentRequest, res: Response) => {
    const { id, name, role } = req.body
    const {jwtPayload} = req 

    if(id === jwtPayload.obj._id){
        res.status(400)
        throw new Error("you canot update your self.")
    }

    const users = await UserModel.findByIdAndUpdate(id, { name, role }, { new: true, runValidators: true })

    res.status(200)
        .json(users)

})

const deleteUser = expressAsyncHandler(async (req: ExtentRequest, res: Response) => {
    const { id } = req.params
    const {jwtPayload} = req 
    
    if(id === jwtPayload.obj._id){
        res.status(400)
        throw new Error("you canot delete your self.")
    }

    const users = await UserModel.findByIdAndDelete(id)
    res.status(200)
        .json(users)

})

export { signUp, signIn, signOut, ping, getAllUsers, updateUser, deleteUser }