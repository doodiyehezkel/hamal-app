import express, { Router } from 'express';
import { signUp, signIn, signOut, ping, getAllUsers, updateUser, deleteUser } from '../controllers/user-controller'
import authHandler from '../middlewares/auth-middleware';
import { adminPermissionHandler } from '../middlewares/permission-middleware';
const userRouter: Router = express.Router()


userRouter.post('/sign-in', signIn)
userRouter.get('/sign-out', signOut)
userRouter.get('/ping', ping)

userRouter.get('/all', authHandler, adminPermissionHandler, getAllUsers)
userRouter.post('/sign-up', authHandler, adminPermissionHandler, signUp)//only admin can sign up new user and need to be conected
userRouter.put('/update', authHandler, adminPermissionHandler, updateUser)
userRouter.delete('/delete/:id', authHandler, adminPermissionHandler, deleteUser)


export default userRouter