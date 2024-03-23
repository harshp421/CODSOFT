const nodemailer=require('nodemailer');
const asyncHandler=require('express-async-handler');

const sendEmail=asyncHandler(async(data,req,res)=>{
   let transportar=nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      auth:{
        user:process.env.MAIL_ID,
        pass:process.env.MP,
      },

   });
   let info=await transportar.sendMail({
      from:"harshparmar0421@gmail.com",
      to:data.to,
      subject:data.subject,
      text:data.text,
      html:data.html
   },(error, info) => {
    if (error) {
      console.log(error);
      // res.status(401).send("error");
      res.status(200).send({ status: "401", message: error });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({
        status: "200",
        message: `Verification link sent to ${email}. \nCheck your inbox`,
      });
    }
  });
   console.log("message Send ",info.messageId);
    console.log("preview url",nodemailer.getTestMessageUrl(info))
})


module.exports=sendEmail;