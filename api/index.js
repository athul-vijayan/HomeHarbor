
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{console.log('Connected to DB');})
.catch((error)=>{console.log(error);})


const app = express();

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode||500
    const message=err.message||'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        message1:'from index.js err handler'
    })
})