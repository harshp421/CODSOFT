import { Request, Response, NextFunction } from 'express';
import userModel, { IUser } from '../model/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { catchAsyncError } from '../middleware/catchAsyncError';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import { accessTokenOptions, refreshTokenOption, sendToken } from '../utils/jwt';
import { redis } from '../utils/redis';
import { getAllUsersService, getUserById, updateUserRoleService } from '../services/user.services';
import cloudinary from 'cloudinary';
//register a user => /api/v1/register
interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, avatar }: IRegisterUser = req.body;

        //if user already exists
        const isEmailExist: IUser = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler('User already exists', 400));
        }
        const user: IRegisterUser = {
            name,
            email,
            password,
        }
        //create activation token
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = ejs.renderFile(path.join(__dirname, '../mails/activation-mail.ejs'), data);

        try {

            await sendMail({
                email,
                subject: 'Account Activation',
                template: 'activation-mail.ejs',
                data
            });
            res.status(200).json({
                success: true,
                message: `Please check your email to activate your account. Activation code is sent to your email ${user.email}`,
                activationToken: activationToken.token
            });
        } catch (err) {
            console.log(err, "emailerror");
            return next(new ErrorHandler(err.message, 400));
        }
    } catch (err) {
        console.log(err, "error");
        return next(new ErrorHandler(err.message, 400));
    }
});


//create activation token 
interface IActivationToken {
    token: string;
    activationCode: string;
}
export const createActivationToken = (user: IRegisterUser): IActivationToken => {
    const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    return { token, activationCode };
}

//activate user account => /api/v1/activation
interface IActivateAccount {
    activationCode: string;
    activationToken: string;

}
export const activateAccount = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { activationCode, activationToken } = req.body as IActivateAccount;
    if (!activationCode) {
        return next(new ErrorHandler('Please enter your activation code', 400));
    }
    const decoded: { user: IRegisterUser, activationCode: string } = jwt.verify(activationToken, process.env.JWT_SECRET) as { user: IRegisterUser, activationCode: string };
    if (decoded.activationCode !== activationCode) {
        return next(new ErrorHandler('Invalid activation code', 400));
    }
    console.log(decoded, "decoded");

    const existUser = await userModel.findOne({ email: decoded.user.email });
    if (existUser) {
        return next(new ErrorHandler('User already activated', 400));
    }
    const { name, email, password } = decoded.user;
    const user = await userModel.create({
        name, email, password
    });
    user.isvariified = true;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: 'Your account is activated successfully',

    });
});

//login user => /api/v1/login
interface ILoginUser {
    email: string;
    password: string;
}

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginUser;
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email and password', 400));
        }
        const user: IUser = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }
      
        const isPasswordMatched: boolean = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }
    //     user.cources.push({ courceId: "65f2805cf3e03d09bb399a6a" });
    //    await  user.save();
        sendToken(user, 200, res);
    } catch (err) {
        next(new ErrorHandler(err.message, 400));
    }
    //  sendToken(user, 200, res);
});


//logout user => /api/v1/logout
export const logoutUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('access_token', 'none', {
            maxAge: 1
        });
        res.cookie('refresh_token', 'none', {
            maxAge: 1
        });
        console.log(req.user)
        redis.del(req.user._id);
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

//update access token => /api/v1/refresh-token
export const updateAccessToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const refresh_token = req.cookies.refresh_token as string;
        if (!refresh_token) {
            return next(new ErrorHandler('Please login to access this resource', 401));
        }
        const decoded: any = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string);
        if (!decoded) {
            return next(new ErrorHandler('Please login to access this resource', 401));
        }
        const session = await redis.get(decoded.id);
        if (!session) {
            return next(new ErrorHandler('Please login to access this resource', 401));
        }
        const user = JSON.parse(session);
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN || " " as string, { expiresIn: "5m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN || " " as string, { expiresIn: "3d" });

        req.user = user;
        res.cookie('access_token', accessToken, accessTokenOptions);
        res.cookie('refresh_token', refreshToken, refreshTokenOption);
       await redis.set(user._id, JSON.stringify(user), 'EX', 604800);
        // res.status(200).json({
        //     success: true,
        //     accessToken,
        //     refreshToken
        // });
        next();
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

// get user info => /api/v1/me
export const getUserinfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {


    try {
        const userId = req.user._id;
        getUserById(userId, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }


});

//social auth 
interface ISocialAuth {
    name: string;
    email: string;
    avatar?: string;
}
export const socialAuth = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, avatar } = req.body as ISocialAuth;
        const user = await userModel.findOne({ email });
        if (!user) {
            const newUser = await userModel.create({ email, name, avatar })
            sendToken(newUser, 200, res);
        }
        else {
            sendToken(user, 200, res);
        }
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})

// update user info => /api/v1/me/update
interface IUpdateUserInfo {
    name: string;
   
}
export const updateUserInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as IUpdateUserInfo;
        const userId = req.user._id;
        const user = await userModel.findById(userId);   
        if (name && user) {
            user.name = name;
        }
     
        await user.save();
        await redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user,
            message: 'User information  updated successfully'
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})



//update user password => /api/v1/password/update

interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
}
export const updateUserPassword = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePassword;

        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler('Please enter old and new password', 400));
        }
        if (oldPassword === newPassword) {
            return next(new ErrorHandler('New password cannot be same as old password', 400));
        }
        const user = await userModel.findById(req.user._id).select('+password');
        if (user.password === undefined) {
            return next(new ErrorHandler('Invalid User', 400));
        }
        const isPasswordMatched = await user.comparePassword(oldPassword);
        if (!isPasswordMatched) {
            return next(new ErrorHandler('Old password is incorrect', 400));
        }
        user.password = newPassword;
        await redis.set(user._id, JSON.stringify(user));
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            user
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})



//update profile picture    
export const updateProfilePicture = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

   try{
    const {avatar}=req.body;

    const userId=req.user._id;
    const user=await userModel.findById(userId);
    if(!user)
    {
        return next(new ErrorHandler('User not found',400));
    }
    if(user && avatar)
    {
        if(user.avatar.public_id)
        {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud=await cloudinary.v2.uploader.upload(avatar,{
                folder:'avatars',
                width:150,
                crop:'scale'
            }); 
            user.avatar={
             public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }else
        {
            const myCloud=await cloudinary.v2.uploader.upload(avatar,{
                folder:'avatars',
                width:150,
                crop:'scale'
            }); 
            user.avatar={
             public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
    }

     await user.save();
     await redis.set(userId,JSON.stringify(user));
     res.status(200).json({
         success:true,
         message:'Profile picture updated successfully',
         user
     });
   }catch(err){
    console.log(err);
   return next(new ErrorHandler(err.message, 400));   
}
})

//get all user 
export const getAllUsers=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try{
      getAllUsersService(res,next);
  }catch(err){
    return next(new ErrorHandler(err.message, 400)); 
  }
})

//update user role
export const updateUserRole=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
   try{
    const {id,role}=req.body;
    updateUserRoleService(id,role,res,next);
   }catch(err){
    return next(new ErrorHandler(err.message, 400)); 
   }
})

//delete user
export const deleteUser=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.params.id;
        const user=await userModel.findById(userId);    
        if(!user)
        {
            return next(new ErrorHandler('User not found',400));
        }
        await user.deleteOne({userId});
        await redis.del(userId);
        res.status(200).json({
            success:true,
            message:'User deleted successfully'
        });
    }catch(err){
        return next(new ErrorHandler(err.message, 400)); 
    }
})