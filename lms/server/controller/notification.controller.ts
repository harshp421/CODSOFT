import { catchAsyncError } from "../middleware/catchAsyncError";
import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import NotificationModel from "../model/notification.model";
var cron = require('node-cron');

//get all nottification
export const getNotifications = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{

    try{
        const notifications = await NotificationModel.find().sort({createdAt:-1});
        res.status(200).json({
            success: true,
            notifications
        })
    }catch(err){
        next(new ErrorHandler(err.message, 500));
    }
})

export const updateNotification = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const notification = await NotificationModel.findByIdAndUpdate(req.params.id,{status:"read"},{new:true});
      
        const notifications = await NotificationModel.find().sort({createdAt:-1});
        res.status(200).json({
            success: true,
            notifications
        })
    }catch(err){
        next(new ErrorHandler(err.message, 500));
    }
})


//learn about croan job and create an api to delete notification after 30 days
cron.schedule('0 0 0 * * *', async() => {
    try{
        const thirtyDaysAgo = new Date(Date.now()-30*24*60*60*1000);
        await NotificationModel.deleteMany({ status:"read",createdAt:{$lte:thirtyDaysAgo}});
       
    }catch(err){
        console.log(err);
    }
  });