import {Request,Response,NextFunction} from 'express'
import ErrorHandler from '../utils/ErrorHandler';
import { catchAsyncError } from '../middleware/catchAsyncError';
import { generateLast12MonthData } from '../utils/analytics.generatar';
import userModel from '../model/user.model';
import CourceModel from '../model/cource.model';
import OrderModel from '../model/order.model';

// get user analytics
export const getUserAnalytics=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
   try
   {
    const users=await generateLast12MonthData(userModel);
    res.status(200).json({
        success:true,
        users
    });
   }catch(err){
         next(new ErrorHandler(err.message,500));
    }
})

// get cources analytics
export const getCourceAnalytics=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
     const cources=await generateLast12MonthData(CourceModel);
     res.status(200).json({
         success:true,
         cources
     });
    }catch(err){
          next(new ErrorHandler(err.message,500));
     }
 })
//get order analytics
export const getOrderAnalytics=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
     const orders=await generateLast12MonthData(OrderModel);
     res.status(200).json({
         success:true,
         orders
     });
    }catch(err){
          next(new ErrorHandler(err.message,500));
     }
 })