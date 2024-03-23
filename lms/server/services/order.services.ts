import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../model/order.model";
import ErrorHandler from "../utils/ErrorHandler";


export  const newOrder=catchAsyncError(async(data:any,res:Response,next:NextFunction)=>{
 try{
    const order=await OrderModel.create(data);
    res.status(200).json({
        success: true,
        message: "Order placed successfully",
        order: order
    })
    
 }catch(err){
        next(new ErrorHandler(err.message, 500));
    }

})
export const getAllOrderservice=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const orders=await OrderModel.find().sort({createdAt:-1});
        res.status(200).json({
            success: true,
            orders
        })
    }catch(err){
        next(new ErrorHandler(err.message, 500));
    }
})