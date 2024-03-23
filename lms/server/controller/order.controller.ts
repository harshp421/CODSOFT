require('dotenv').config();
import { catchAsyncError } from "../middleware/catchAsyncError";
import { isAuthenticated } from "../middleware/auth";
import userModel from "../model/user.model";
import CourseModel from "../model/cource.model";
import OrderModel, { IOrder } from "../model/order.model";
import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { getAllOrderservice, newOrder } from "../services/order.services";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../model/notification.model";
import { redis } from "../utils/redis";
import { json } from "stream/consumers";

const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);

///create order
export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courceId, payment_info } = req.body as IOrder;
        console.log(req.body,"body")
        const user = await userModel.findById(req.user._id);
        if(payment_info)
        {
            if("id" in payment_info)
            {
          const paymentIntentsId=payment_info.id;
          const paymentIntent=await stripe.paymentIntents.retrieve(paymentIntentsId);
          if(paymentIntent.status!=="succeeded")
          {
                return next(new ErrorHandler("Payment not succeeded",400))
          }
            }
        }
        if (!user) {
            return next(new ErrorHandler("User not found", 404))
        }
        const courceExistInUser = user.cources.some((cource) => cource.courceId.toString() === courceId);

        if (courceExistInUser) {
            return next(new ErrorHandler("You already purchased this course", 400))
        }
        const cource = await CourseModel.findById(courceId);
        if (!cource) {
            return next(new ErrorHandler("Cource not found", 404))
        }
        const data: any = {
            courceId: cource._id,
            userId: req.user._id,
            payment_info
        }
       

        //creata a mail and send to user
        const mailData = {
            order: {
                _id: cource._id.toString().slice(0, 5),
                name: cource.name,
                price: cource.price,
                data: new Date().toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }),

            }
        }
        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirm.ejs'), { order: mailData });
        try {
            if (user) {
                const mailOptions = {
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirm.ejs",
                    data: mailData
                }
                await sendMail(mailOptions);
            }


        } catch (err) {
            console.log(err, "error in sending mail");
            next(new ErrorHandler(err.message, 500))
        }
        // send notificatopn to admin
        user.cources.push({ courceId: cource._id });
        await redis.set(req.user?._id,JSON.stringify(user));
        await user.save();
        //send notification to admin

        const notification = {
            userId: user._id.toString().slice(0, 6),
            title: "New Order",
            message: `New order is placed by ${user.name}`
        }
        await NotificationModel.create(notification);
       
        if(cource.purchased)
        {
            cource.purchased=cource.purchased+1;
        }
        else{
            cource.purchased;
        }
        await cource.save();
        newOrder(data, res, next)
        
    } catch (err) {
        console.log(err, "error in create order");
        next(new ErrorHandler(err.message, 500))
    }

})


//  get all orders for admin 
export const getAllOrdersAdmin = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllOrderservice(req, res, next);
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})
  

//send stripe pulic key
export const sendStripePublicKey = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})

// new payment
export const  newPayment=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        
        const payment=await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"INR",
            metadata:{integration_check:"accept_a_payment",company:"Educatify"},
            automatic_payment_methods:{
                enabled:true,
            },
        })

        res.status(200).json({
            success:true,
            client_secret:payment.client_secret
        })
        
    }catch(err)
    {
        console.log(err,"error in create order");
        next(new ErrorHandler(err.message,500))
    }
})