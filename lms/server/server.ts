import {app} from './app';
import connectDB from './utils/db';
require('dotenv').config();
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
app.listen(process.env.PORT,()=>{
   console.log(`Server is running on port ${process.env.PORT}`);
   connectDB();
})