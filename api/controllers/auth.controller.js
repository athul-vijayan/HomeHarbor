import bcryptjs from 'bcryptjs'
import userModel from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup=async (req, res, next)=>{
    const {username, email, password}=req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const signUpUserModel = new userModel({
        username,
        email,
        password:hashedPassword
    })
    try {
        await signUpUserModel.save()
        res.status(201).json('User Created Successfully')
    } catch (error) {
        next(error)
    }
}

export const signin=async (req, res, next)=>{
    const {email, password}=req.body
    try{
        const validUser = await userModel.findOne({email})
        if(!validUser) return next(errorHandler(404,'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials'))
        const token = jwt.sign({id: validPassword._id},process.env.JWT_SECRET)
        const {password: pass, ...rest}=validUser._doc
        res.cookie('access_token', token,{httpOnly: true}).status(200).json(rest)
        

    }catch(err){
        next(err)
    }
}


