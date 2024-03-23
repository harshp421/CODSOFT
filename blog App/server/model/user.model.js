const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type: Boolean,
        default:false
    },
    savedBlogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"blog"
        }
    ],
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordResetExpries:Date,
    
},{
    timestamps:true
})


// encrypt the passeord 

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
  const salt=await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt);
  next();
})

userSchema.methods.ispasswordMatched=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
 }
 userSchema.methods.createPasswordResetToken=async function()
 {
     const resettoken=crypto.randomBytes(32).toString("hex");
     this.passwordResetToken=crypto.createHash("sha256").update(resettoken).digest("hex");
     this.passwordResetExpries=Date.now()+30*60*1000; //10 monute
     return resettoken;
 
 }
  
module.exports = mongoose.model('User',userSchema);

