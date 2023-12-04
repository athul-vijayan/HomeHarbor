import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, getUser, getUserListing, updateUser, userTest } from '../controllers/user.controller.js';

const userRouter=express.Router();

userRouter.get('/update', userTest)

userRouter.get('/listings/:id', verifyToken, getUserListing)
userRouter.delete('/delete/:id', verifyToken, deleteUser)
userRouter.post('/update/:id', verifyToken,updateUser)
userRouter.get('/:id',  getUser)

export default userRouter