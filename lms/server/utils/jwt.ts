require("dotenv").config();
import { Response } from "express";
import { IUser } from "../model/user.model";
import {redis }from './redis';


interface ITokenOption{
    export:Date;
    maxAge:number;
    httpOnly:boolean;
    sameSite: "lax" | "strict" | "none";
    secure?:boolean;
}


export const accessTokenExpireTime=parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME || '900',10);
export const refreshTokenExpireTime=parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME || '2592000',10);

//option for cookies
export const accessTokenOptions :ITokenOption={
   export:new Date(Date.now()+accessTokenExpireTime*60*60*1000),
   maxAge:accessTokenExpireTime*60*60*1000,
   httpOnly:true,
   sameSite:'lax',
}   
export const refreshTokenOption :ITokenOption={
    export:new Date(Date.now()+refreshTokenExpireTime*24*60*60*1000),
    maxAge:refreshTokenExpireTime*24*60*60*1000,
    httpOnly:true,
    sameSite:'lax',
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken=user.SignAccessToken();
    const refreshToken=user.SignRefreshToken();

    //upload session to redis
    redis.set(user._id,JSON.stringify(user) as any);

    //parse environment variable to integer with fellback value

    //only set secure to true in production
    if(process.env.NODE_ENV==='production'){
        accessTokenOptions.secure=true;
        refreshTokenOption.secure=true;
    }

   
    //send cookies
    res.cookie('access_token',accessToken,accessTokenOptions);
    res.cookie('refresh_token',refreshToken,refreshTokenOption);
    res.status(statusCode).json({
        success:true,
        user,
        accessToken,
        refreshToken
    });
}