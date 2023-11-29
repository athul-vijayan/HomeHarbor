import express from 'express'
import { googleSignIn, signOut, signin, signup } from '../controllers/auth.controller.js'


const authRouter=express.Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/google',googleSignIn)
authRouter.get('/signout', signOut)
export default authRouter
