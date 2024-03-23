import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import { createCource, getAllCourceService } from "../services/cource.services";
import CourceModel from "../model/cource.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from 'ejs'
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../model/notification.model";
// upload cource
export const uploadCource = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            const image = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: 'cources'
            });
            data.thumbnail = {
                public_id: image.public_id,
                url: image.secure_url
            }
        }
        createCource(data, res, next);

    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})

//update courece
export const updateCource = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courecId = req.params.id;
        if (thumbnail) {
            // const cource=await CourceModel.findById(req.params.id);
            // const image_id=cource.thumbnail.public_id;
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const image = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: 'cources'
            });
            data.thumbnail = {
                public_id: image.public_id,
                url: image.secure_url
            }
        }
        const cource = await CourceModel.findByIdAndUpdate(courecId, {
            $set: data
        }, { new: true });

        res.status(200).json({
            success: true,
            cource,
            message: 'Cource updated successfully'
        });

    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})

//get all cource
// get single cource    ===>> WithOut purches <<====

export const getSingeCource = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courceId = req.params.id;
        const isCatchExist = await redis.get(courceId);
        if (isCatchExist) {
            const cource = JSON.parse(isCatchExist);
            return res.status(200).json({
                success: true,
                cource
            });
        }
        else {
            const cource = await CourceModel.findById(req.params.id).select('-courceData.videoUrl -courceData.suggestion -courceData.question  -courceData.links ');
            if (!cource) {
                return next(new ErrorHandler('Cource not found', 404));
            }
            else {
                await redis.set(courceId, JSON.stringify(cource), 'EX', 604800);
            }
            res.status(200).json({
                success: true,
                cource
            });
        }
    } catch (err) {
        console.log(err)
        next(new ErrorHandler(err.message, 500));
    }
})

//get all courcces      without perches
export const getAllCources = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

      
            const allCources = await CourceModel.find().select('-courceData.videoUrl -courceData.suggestion -courceData.question  -courceData.links ');
            if (!allCources) {
                return next(new ErrorHandler('Please Refress', 404));
            }
            await redis.set('allCources', JSON.stringify(allCources));
            res.status(200).json({
                success: true,
                allCources
            });
        

    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})


// get cources for user who parches the cource 
export const getCourceByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.user);
        const userCourceList = req.user.cources;
        const courceId = req.params.id;
        const courceExist = userCourceList.find((cource: any) => cource.courceId.toString() === courceId);
        if (!courceExist) {
            return next(new ErrorHandler('You have not purchased this cource', 404));
        }
        const cource = await CourceModel.findById(courceId);
        const content = cource.courceData;
        res.status(200).json({
            success: true,
            content
        });
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err.message, 500));
    }
})

/// add question to cource
interface IQuestionData {
    question: string;
    courceId: string;
    contentId: string;
}

export const addQuestion = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, contentId, courceId }: IQuestionData = req.body;
        const cource = await CourceModel.findById(courceId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler('Content not found', 404));
        }
        const courceContent = cource.courceData.find((content: any) => content._id.equals(contentId));
        if (!courceContent) {
            return next(new ErrorHandler('Content not found', 404));
        }
        //create new questation
        const newQuestion: any = {
            user: req.user,
            question,
            questionReply: []

        };
        courceContent.question.push(newQuestion);
        //save the course
          NotificationModel.create({
            userId: req.user._id,
            title: `${req.user.name} asked a question in ${courceContent.title}`,
            message: question
          })
        await cource.save();
        res.status(200).json({
            success: true,
            message: 'Question added successfully',
            cource
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})

// add answer 
interface IAnswerData {
    answer: string;
    questionId: string;
    courceId: string;
    contentId: string;
}
export const addAnswer = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, questionId, contentId, courceId }: IAnswerData = req.body;
        const cource = await CourceModel.findById(courceId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler('Content not found', 404));
        }
        const courceContent = cource.courceData.find((content: any) => content._id.equals(contentId));
        if (!courceContent) {
            return next(new ErrorHandler('Content not found', 404));
        }
        const question = courceContent.question.find((question: any) => question._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler('Question not found', 404));
        }
        //create new answer
        const newAnswer: any = {
            user: req.user,
            answer
        };
        question.questionReply.push(newAnswer);
        //save the course
        await cource.save();

        if (req.user._id === question.user._id) {
            //create one notification
            await NotificationModel.create({
                userId: req.user._id,
                title: `Your question in ${courceContent.title} has been answered`,
                message: answer
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: courceContent.title
            }
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                await sendMail({
                    email: question.user.email,
                    subject: 'Question Reply',
                    template: "question-reply.ejs",
                    data
                });
            } catch (err) {
                next(new ErrorHandler(err.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            message: 'Answer added successfully',
            cource
        });

    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})

// add review in our cource 

interface IReviewData {
    review: string;
    rating: number;
    courceId: string;
}
export const addReviewToCource = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try{
      const userCourceList=req.user.cources;
        const courceId=req.params.id;
        
        //if courece is not in user cource list
        const courceExist=userCourceList.some((cource:any)=>cource.courceId.toString()===courceId.toString());
        if(!courceExist){
            return next(new ErrorHandler('You have not purchased this cource',404));
        }
        const cource=await CourceModel.findById(courceId);
        const {review,rating}:IReviewData=req.body;
        const reviewData:any={
            user:req.user,
            comment:review,
            rating

        }
        cource.reviews.push(reviewData);
        // for find the avarage rating of cource
        cource.ratings=cource.reviews.reduce((acc:any,item:any)=>item.rating+acc,0)/cource.reviews.length;
        await cource.save();
        
        const notification={
            title:`${req.user.name} added review in ${cource.name}`,
            message:review
        }
        //create notification  

        res.status(200).json({
            success:true,
            message:'Review added successfully',
            cource
        });
    }catch(err){
        next(new ErrorHandler(err.message, 500));
    }

})

//give reply to review
interface IAddReplyData{
    comment:string;
    reviewId:string;
    courceId:string;
}
export const addReplyToReview=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
   try
   {
    const {comment,reviewId,courceId}:IAddReplyData=req.body;
    const cource=await CourceModel.findById(courceId);
    if(!cource){
        return next(new ErrorHandler('Cource not found',404));
    }
    const review=cource.reviews.find((item:any)=>item._id.equals(reviewId));
    if(!review){
        return next(new ErrorHandler('Review not found',404));
    }
    console.log(review);
    const newReply:any={
        user:req.user,
        comment
    }
    review.commentReply.push(newReply);
    await cource.save();
    res.status(200).json({
        success:true,
        message:'Reply added successfully',
        cource
    });
    
   }catch(err){
    next(new ErrorHandler(err.message, 500));
   }
})


//get all cources for admin
export const getAllCourcesAdmin=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        getAllCourceService(res,next);
    }catch(err){
      return next(new ErrorHandler(err.message, 400)); 
    }
  })
  

//delete cource
export const deleteCource=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {courceId}=req.params;
        console.log(courceId);
        const cource=await CourceModel.findById(courceId);
        if(!cource){
            return next(new ErrorHandler('Cource not found',404));
        }
        //delete thumbnail
        // if(cource.thumbnail){
        //     await cloudinary.v2.uploader.destroy(cource.thumbnail.public_id);
        // }
        await cource.deleteOne({ _id: courceId });
        await redis.del(courceId);
        res.status(200).json({
            success:true,
            message:'Cource deleted successfully'
        });
    }catch(err){
        next(new ErrorHandler(err.message, 500));
    }
})


export const generateVideoUrl=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const { videoId } = req.body;
        const Response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Apisecret I9YsgLpxrnuIDEv3rnRpILNpybUeOwDYErA0I33f2FW04kdqN20Mzz52lCfvUVfK',
            },
            body: JSON.stringify({
                ttl: 300
            })
        });
        const data = await Response.json();
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})