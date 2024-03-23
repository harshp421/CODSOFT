import { Request,Response,NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import LayoutModel from "../model/layout.model";

export const CreateLayout=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try{
  const {type}=req.body;
  const isTypeExist=await LayoutModel.findOne({type})
  if(isTypeExist)
  {
    return next(new ErrorHandler(`${type} already exist`,400));
  }
  if(!type)
    {
        return next(new ErrorHandler("Please enter layout type",400));
    }
  if(type==="Banner")
  {
  const {image,title,subTitle}=req.body;
    if(!image || !title || !subTitle)
    {
        return next(new ErrorHandler("Please enter all the fields",400));
    }
    const myCloud=await cloudinary.v2.uploader.upload(image,{
        folder:'layouts'
    });

    const banner={
        image:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
        title,
        subTitle,
        }
    await LayoutModel.create(banner);
  }
  if(type==="Faq")
    {
        const {faq}=req.body;
        if(!faq)
        {
            return next(new ErrorHandler("Please enter all the fields",400));
        }
        const FaqItem= await Promise.all(faq.map(async(faq)=>{
          
                return {
                    question:faq.question,
                    answer:faq.answer
                }
           
          }  ))
        
        await LayoutModel.create({type:"FAQ",faq:FaqItem});
    }
    if(type==="Category")
    {
        const {categories}=req.body;
        if(!categories)
        {
            return next(new ErrorHandler("Please enter all the fields",400));
        }
        const categoryItem=await Promise.all(categories.map(async(item)=>{
            return {
                title:item.title
            }
        }))
        await LayoutModel.create({type:"Category",category:categoryItem});
    }
    res.status(200).json({
        success:true,
        message:'Layout created successfully'
    });
  }catch(err){
    next(new ErrorHandler(err.message,500));
  }

 })


 //edit layout
    export const editLayout=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const layout:any=await LayoutModel.findById(req.params.id);
            if(!layout)
            {
                return next(new ErrorHandler("Layout not found",404));
            }
            if(layout.type==="Banner")
            {
                const {image,title,subTitle}=req.body;
                if(image)
                {
                    await cloudinary.v2.uploader.destroy(layout.image.public_id);
                    const myCloud=await cloudinary.v2.uploader.upload(image,{
                        folder:'layouts'
                    });
                    layout.image.public_id=myCloud.public_id;
                    layout.image.url=myCloud.secure_url;
                }
                layout.title=title;
                layout.subTitle=subTitle;
                await layout.save();
            }
            if(layout.type==="Faq")
            {
                const {faq}=req.body;
                if(!faq)
                {
                    return next(new ErrorHandler("Please enter all the fields",400));
                }
                const FaqItem= await Promise.all(faq.map(async(faq)=>{
                  
                        return {
                            question:faq.question,
                            answer:faq.answer
                        }
                   
                  }  ))
                
                await layout.updateOne({type:"FAQ",faq:FaqItem});
            }
            if(layout.type==="Category")
            {
                const {categories}=req.body;
                if(!categories)
                {
                    return next(new ErrorHandler("Please enter all the fields",400));
                }
                const categoryItem=await Promise.all(categories.map(async(item)=>{
                    return {
                        title:item.title
                    }
                }))
                await layout.updateOne({type:"Category",category:categoryItem});  
            }
            res.status(200).json({
                success:true,
                message:'Layout updated successfully'
            });
        }catch(err){
            next(new ErrorHandler(err.message,500));
        }
    })

    //get layout by type
    export const getLayourByType=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const layout:any=await LayoutModel.findOne({type:req.body.type});
            if(!layout)
            {
                return next(new ErrorHandler("Layout not found",404));
            }
            res.status(200).json({
                success:true,
                layout
            });
        }catch(err){
            next(new ErrorHandler(err.message,500));
        }
    })