const generateToken = require('../config/jwtToken');
const User = require('../model/user.model');
const asyncHandler = require('express-async-handler');
const crypto = require("crypto");
const sendEmail = require('./email.controller');
const validateMongodbId = require('../config/validateMongodbid');
const resetPwdTemplate = require('../temlates/resetPWdTemplate');
const Joi = require('joi');


//creating  a user 
const registerAUser = asyncHandler(async (req, res) => {

  // console.log(req.body);

  try
  {
   // Check if the email already exists
   const email = req.body.email;
   const findUser = await User.findOne({ email: email });

   if (!findUser) {
      // Create a user 
      const createUser = await User.create(req.body);
      res.status(200).json({
         status: true,
         message: "Register Successfully!",
         createUser
      });
   }
   else {
       res.status(400).json({
         status: false,
         message: "User Already Exists"
      })
      
      
   }
  }catch(error)
  {
   console.log(error);
   throw new Error("Something went wrong!");
  }
});


// login a user 

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   //check if user us already exixt or not
   try
   {
      const findUser = await User.findOne({ email: email });
      if (findUser && (await findUser.ispasswordMatched(password))) {
         res.status(200).json({
            status: true,
            message: 'Login Successfully!',
            token: generateToken(findUser?._id),
             user:findUser
         })
      }
      else {
         res.status(400).json({
          status: false,
          message: "Invalid Email or Password"
         })
      }
   }
   catch(error)
   {
   throw new Error(error);
   }
});

//get all user 

const getAllUser = asyncHandler(async (req, res) => {
   try {
      const allUser = await User.find();
      res.status(200).json({
         status: true,
         message: 'All User Fatech SuccessFully!',
         allUser
      })

   } catch (error) {
      throw new Error(error);
   }
})

//get a single User

const getAUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
   validateMongodbId(id);
   try {
      const getProfile = await User.findById(id);
      res.status(200).json({
         status: true,
         message: 'User Found!',
         getProfile
      })

   } catch (error) {
      throw new Error(error);
   }
})


//update a user 
const updateAUser = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   // Checking mongodb is if is valid or not 
   validateMongodbId(_id);
   try {
      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      res.status(200).json({
         status: true,
         message: "Profile Update SuccessFully!",
         user
      })
   } catch (error) {
      throw new Error(error);
   }
})



// deleting a user 
const deteleUser = asyncHandler(async (req, res) => {

   const { id } = req.params;
   validateMongodbId(id);
   try {
      await User.findByIdAndDelete(id);
      res.status(200).json({
         status: true,
         message: "User Deleted SuccessFully!"
      })
   } catch (error) {
      throw new Error(error);
   }
})

// block a user

const blockAUser = asyncHandler(async (req, res) => {

   const { id } = req.params;
   validateMongodbId(id);
   try {
      const blockUser = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

      res.status(200).json({
         status: true,
         message: "User Blocked SuccessFully!",
         blockUser
      })
   } catch (error) {
      throw new Error(error);
   }
})

const unblockblockAUser = asyncHandler(async (req, res) => {

   const { id } = req.params;
   validateMongodbId(id);
   try {
      const UnblockUser = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });

      res.status(200).json({
         status: true,
         message: "User UnBlocked SuccessFully!",
         UnblockUser
      })
   } catch (error) {
      throw new Error(error);
   }
})

//update password 
const updatePassword = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   const { password } = req.body;
   validateMongodbId(_id);
   try {
      const user = await User.findById(_id);
      if (user && (await user.ispasswordMatched(password))) {
         throw new Error("Please Provide a new Password Instide on old one");
      }
      else {

         user.password = password;
         await user.save();
         res.status(200).json({
            status: true,
            message: "Possword Updated successfully!",
            user
         })

      }


   } catch (error) {
      throw new Error(error);
   }

})

// forget password token
const forgetPasswordToken = asyncHandler(async (req, res) => {
   const { email } = req.body;
   const user = await User.findOne({ email: email });
   if (!user) throw new Error("User Not Existst with this email");
   try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetLink = `http://localhost:4000/api/user/reset-password/${token}`;
      const data = {
         to: email,
         Text: `Hey ${user.firstname + " " + user.lastname}`,
         subject: "Forget password link",
         html: resetPwdTemplate(resetLink),
      }
      sendEmail(data);
      res.status(200).json({
         status: true,
         resetLink
      })
   } catch (error) {
      throw new Error(error);
   }
})

//reset password

const resetPassword = asyncHandler(async (req, res) => {
   const { password } = req.body;
   const { token } = req.params;
   const hasedToken = crypto.createHash('sha256').update(token).digest("hex");
   const user = await User.findOne({ passwordResetToken: hasedToken, passwordResetExpries: { $gt: Date.now() } });
   if (!user) throw new Error("Token expired,Please try again");
   user.password = password;
   user.passwordResetToken = undefined;
   user.passwordResetExpries = undefined;
   await user.save();

   res.status(200).json({
      status: true,
      message: "password Reset Successfully"
   })
})
module.exports = { registerAUser, loginUser, getAllUser, updateAUser, deteleUser, getAUser, blockAUser, unblockblockAUser, updatePassword, forgetPasswordToken, resetPassword };