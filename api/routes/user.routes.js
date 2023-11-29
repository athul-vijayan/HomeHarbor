import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, updateUser, userTest } from '../controllers/user.controller.js';

const userRouter=express.Router();

userRouter.get('/update', userTest)


userRouter.delete('/delete/:id', verifyToken, deleteUser)
userRouter.post('/update/:id', verifyToken,updateUser)

export default userRouter