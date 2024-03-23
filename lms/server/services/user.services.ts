import { NextFunction, Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../model/user.model";
import ErrorHandler from "../utils/ErrorHandler";



// get user by id 
export const getUserById = async(id:string,res:Response)=>{

 const userJson=await redis.get(id);
 if(userJson)
 {
    const user=JSON.parse(userJson);
    res.status(200).json({
        success:true,
        user
    });
 }
 
}

// get all users
export const getAllUsersService = async(res:Response,next:NextFunction)=>{
   try{
    const user=await userModel.find().sort({createdAt:-1});
    return res.status(200).json({
        success:true,
        user
    });
   }catch(err){
        next(new ErrorHandler(err.message, 500))
    }
}

//update user role
export const updateUserRoleService = async(id:string,role:string,res:Response,next:NextFunction)=>{
    try{
        const user=await userModel.findByIdAndUpdate(id,{role:role},{new:true});
        res.status(200).json({
            success:true,
            user
        });
    }catch(err){
        next(new ErrorHandler(err.message, 500))
    }
}