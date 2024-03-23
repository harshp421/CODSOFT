import mongoose from "mongoose";
require("dotenv").config();

const dbUrl=process.env.DB_URI as string || "";


const connectDB = async () => {
  try{
   
     const connct=await mongoose.connect(dbUrl)
    console.log(`MongoDB connected: ${connct.connection.host}`);
  }catch(err){
    console.log(err); 
   setTimeout(connectDB, 5000);
  }   
}

export default connectDB;