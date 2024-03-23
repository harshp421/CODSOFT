import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError"
import ErrorHandler from "../utils/ErrorHandler";
import CourceModel from "../model/cource.model";

export const createCource=catchAsyncError(async(data:any,res:Response,next:NextFunction)=>{
  try{
    const cource=await CourceModel.create(data);
    res.status(201).json({
        success:true,
        cource,
        message:'Cource created successfully' 
    });
  }catch(err)
    {
        next(new ErrorHandler(err.message,500));
    }
})


// get all users
export const getAllCourceService = async(res:Response,next:NextFunction)=>{
  try{
   const cources=await CourceModel.find().sort({createdAt:-1});
   return res.status(200).json({
       success:true,
       cources
   });
  }catch(err){
       next(new ErrorHandler(err.message, 500))
   }
}