import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config.js'
import authroutes from "./routes/authroutes.js";
import chatRoutes from './routes/chatRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json())
app.use('/auth', authroutes)
app.use('/chat', chatRoutes)
app.use("/users", userRoutes);

connectDB();

app.listen(PORT, () =>{
    console.log(`Server is running on Port: ${PORT}`)
})