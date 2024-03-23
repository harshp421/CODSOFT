const express=require('express');
const { registerAUser, loginUser, getAllUser, updateAUser ,deteleUser, getAUser, blockAUser, unblockblockAUser, updatePassword, forgetPasswordToken, resetPassword} = require('../../controller/user.controller');
const authMiddleware = require('../../middleware/authMiddleware');


const userRoute=express.Router();

//post Route
userRoute.post('/register',registerAUser);
userRoute.post('/login',loginUser);
userRoute.post("/forgot-password",forgetPasswordToken);

//get Route
userRoute.get('/all-users',getAllUser);
userRoute.get('/:id',authMiddleware,getAUser);

//All Put Route
userRoute.put('/update-profile',authMiddleware,updateAUser);
userRoute.put('/block/:id',authMiddleware,blockAUser);
userRoute.put('/unblock/:id',authMiddleware,unblockblockAUser);
userRoute.put('/update-password',authMiddleware,updatePassword);
userRoute.put('/reset-password/:token',resetPassword);

//all delete Routes
userRoute.delete('/:id',authMiddleware,deteleUser)
module.exports=userRoute;