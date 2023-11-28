import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'


const authRouter=express.Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/signup', (req, res)=>{res.json({message: 'signup roter working'})})

export default authRouter
