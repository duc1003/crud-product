import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

export const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        // console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);  
        process.exit(1); // process code 1 code means exit with failure, 0 means success
    };
}