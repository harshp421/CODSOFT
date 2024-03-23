
import { Request, Response, NextFunction } from 'express'
import ErrorHandler from '../utils/ErrorHandler';
import jwt from 'jsonwebtoken';
import { redis } from '../utils/redis';
import { catchAsyncError } from './catchAsyncError';
import { json } from 'stream/consumers';

/// this is for auth middleware
export const isAuthenticated =catchAsyncError( async(req: Request, res: Response, next: NextFunction) => {

    const access_token = req.cookies.access_token as string;

    if (!access_token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    const decoded: any = jwt.verify(access_token, process.env.ACCESS_TOKEN as string);
    if (!decoded) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }
  const user =await redis.get(decoded.id);
    if(!user)
    {
        return next(new ErrorHandler('User not found', 401));
    }
        req.user = JSON.parse(user);
        next();

})

//middleware for user roles 

export const authenticationRoles=(...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`Role(${req.user.role}) is not allowed to access this resource`,403));
        }
        next();
    }
}