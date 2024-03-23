/* not Found Error Handler */

const notFound=(req,res,next)=>{
    const error=new Error(`Route Not Found:${req.originalUrl}`);
    res.status(404);
    next(error);
  }
  
  /* error handler  */
  
  const handleError=(error,req,res,next)=>{
   
     const statuscode=res.statusCode?res.statusCode:500;
     res.status(statuscode);
     res.json({
      status:false,
      message:error?.message,
      stack:error?.stack,
     
     })
  }
  
module.exports={handleError,notFound};