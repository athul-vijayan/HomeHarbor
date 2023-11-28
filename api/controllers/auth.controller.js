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

export const googleSignIn=async (req, res, next)=>{
    try {
        const user=await userModel.findOne({email: req.body.email})
        if(user){
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password:pass,  ...rest}=user._doc
            res
                .cookie('access_token', token,{httpOnly: true})
                .status(200)
                .json(rest)
            
        }else{
            const generatedPassWord=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
            const hashedPassword=bcryptjs.hashSync(generatedPassWord, 10)
            const userDetails={
                username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email:req.body.email,
                password:hashedPassword,
                avatar:req.body.photo
            }
            const newUserModel=new userModel(userDetails)
            newUserModel.save()
            const token=jwt.sign({id:newUserModel._id}, process.env.JWT_SECRET)
            const {password:pass, ...rest}=newUserModel._doc
            res
                .cookie('access_token',token, {httpOnly:true})
                .status(200)
                .json(rest)
        }
        
    } catch (error) {
        next(error)
    }
}

