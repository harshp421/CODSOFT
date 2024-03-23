require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';
import courceRouter from './routes/cource.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';;
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.route';


//body parser
app.use(express.json({limit: '50mb'}));

//cookie parser
app.use(cookieParser());

app.use(cors(
    {
        origin: ['http://localhost:3000'],
        credentials: true
    }
));

//TESTING api
app.get('/test',(req:Request,res:Response)=>{
    res.status(200).json({success:true, message:'Hello from server'});
})


//routes
app.use('/api/v1',userRouter);
app.use('/api/v1',courceRouter);
app.use('/api/v1',orderRouter);
app.use('/api/v1',notificationRouter);
app.use('/api/v1',analyticsRouter);
app.use('/api/v1',layoutRouter);

//unhandled routes  just like 404 page
app.all('*',(req:Request,res:Response,next:NextFunction)=>{
    const error = new Error(`Can't find ${req.originalUrl} on this server`) as any;
    error.statusCode = 404;
    next(error);
})

app.use(ErrorMiddleware);