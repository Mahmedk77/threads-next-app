import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    if(!process.env.DB_URI) return console.log("Missing DB URI");
    if(isConnected) return console.log("DB connection already established");

    try {
        await mongoose.connect(process.env.DB_URI);

        isConnected = true;
        console.log("Successfully Connected to Database");
    } catch (error) {
        console.log(error);
        
    }
}