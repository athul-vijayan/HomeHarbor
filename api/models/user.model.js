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
        },
        avatar:{
            type:String,
            default:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait.png"
            
        }
    }, {timestamps : true}
)

const userModel = mongoose.model('user-collection', userSchema)

export default userModel