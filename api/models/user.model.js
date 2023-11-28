import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true
        },
        email:{
            type: String,
            required: true,
            unique:true
        },
        password:{
            type: String,
            required: true,
        }
    }, {timestamps : true}
)

const userModel = mongoose.model('user-collection', userSchema)

export default userModel