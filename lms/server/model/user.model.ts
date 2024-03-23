import mongoose,{Schema,model,Document, Model} from "mongoose";
import bcrypt from "bcryptjs";
require('dotenv').config();
import jwt from "jsonwebtoken";

const emailRegex:RegExp=  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:string;
    avatar:{
        public_id:string;
        url:string;
    };
    isvariified:boolean;
    cources:Array<{courceId:string}>;
   comparePassword(enteredPassword:string):Promise<boolean>;
   SignAccessToken:()=>string;
   SignRefreshToken:()=>string;
  
}

const userSchema:Schema<IUser>=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        match:[emailRegex,'Please enter a valid email address']
    },
    password:{
        type:String,
        minlength:[6,'Your password must be longer than 6 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            
        },
        url:{
            type:String,
           
        }
    },
    role:{
        type:String,
        default:'user'
    },
    isvariified:{
        type:Boolean,
        default:false
    },
    cources:[
        {
            courceId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Cource'
            }
        }
    ]
},{timestamps:true});


//hashing the password before saving the user
userSchema.pre<IUser>('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
});

//sign access token using jsonwebtoken
userSchema.methods.SignAccessToken=function(){
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN || " " as string,{expiresIn:"5m"});
}
//sign refresh token using jsonwebtoken
userSchema.methods.SignRefreshToken=function(){
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN || " " as string,{expiresIn:"3d"});
}

//compare user password
userSchema.methods.comparePassword=async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);
}

const userModel:Model<IUser>=mongoose.model('User',userSchema);

export default userModel;


