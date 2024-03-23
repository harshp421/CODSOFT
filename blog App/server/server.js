const express=require('express');
const DBconfig = require('./config/DBconfig');
const app=express();
const cors = require('cors');
const userRoute = require('./routes/user/user.route');
const { handleError, notFound } = require('./middleware/errorHandler');
const blogRoute = require('./routes/blog/blog.route');
const dotenv=require('dotenv').config();
//connect to the database
DBconfig();

//cors
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// setting up the route
app.get('/',(req,res)=>{
 res.send('Welcome to the Blog API');
}) 
 
app.use("/api/user",userRoute);
app.use("/api/blog",blogRoute);

app.use(handleError);
app.use(notFound);
// starting the server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})