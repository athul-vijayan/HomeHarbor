import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import listingModel from '../models/listing.model.js'

export const userTest = (req, res) => {
  res.json({ message: "api working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update your account only"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next)=>{
    if(req.user.id !== req.params.id) 
        return next(errorHandler(401, 'cant delete other users account'))
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('account has been deleted')
    } catch (error) {
        next(error)
    }

}

export const getUserListing= async (req, res, next)=>{
  if(req.user.id===req.params.id){
    
    try {
      const listings=await listingModel.find({
        userRef:req.params.id
      })
      res.status(200).json(listings)

    } catch (error) {
      next(error)
    }
  }else{
    return next(errorHandler(401, 'You can only view your own listings'))
  }
}