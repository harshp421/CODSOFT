import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "./user.model";


interface IComment extends Document {
    user:IUser;
    question:string;
    questionReply?:IComment[];
    
    
}

interface IReview extends Document {
  user:IUser;
   rating:number;
   comment:string;
   commentReply?:IComment[];
}

interface ILink extends Document {
  title:string;
  url:string
}

interface ICourceData extends Document {
    title:string;
    description:string;
    videoUrl:string;
    videoSection:ILink[];
    videoLength:number;
    videoPlayer:string;
    links:ILink[];
    suggestion:string;
    question:IComment[];
}
interface IThumbnail extends Document {
    public_id?:string;
    url?:string;
}
interface ICource extends Document {
    name:string;
    description:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:IThumbnail;
    category?:string;
    subCategory?:string;
    tags:string[];
    level:string;
    demoUrl:string;
    benefits:{title:string}[];
    prerequisites:{title:string}[];
    reviews:IReview[];
    courceData:ICourceData[];
    ratings?:number;
    purchased?:number;
}



const raviewSchema=new Schema<IReview> ({
       user:Object,
       rating:{
        type:Number,
        default:0
       },
       comment:String,
         commentReply:[Object]
})
const linkSchema=new Schema<ILink> ({
    title:String,
    url:String
})

const commentSchema=new Schema<IComment> ({
    user:Object,
    question:String,
    questionReply:[Object]
})


const courceDataSchema=new Schema<ICourceData> ({
    title:String,
    description:String,
    videoUrl:String,
    videoSection:String,
    videoLength:Number,
    videoPlayer:String,
    links:[linkSchema],
    suggestion:String,
    question:[commentSchema]
})



const courceSchema=new Schema<ICource> ({
    name:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    estimatedPrice:{
        type:Number,
       
    },
    category:{
        type:String,
        
    },
    subCategory:{
        type:String,
        
    },
    thumbnail:{
        public_id:{
            type:String,
           
        },
        url:{
            type:String,
          
        }
    },
    tags:[String],
    level:{
        type:String,
        
    },
    demoUrl:String,
    benefits:[{title:String}],
    prerequisites:[{title:String}],
    reviews:[raviewSchema],
    courceData:[courceDataSchema],
    ratings:{
        type:Number,
        default:0
    },
    purchased:{
        type:Number,
        default:0
    }
},{timestamps:true})

const CourceModel:Model<ICource>=mongoose.model('Cource',courceSchema);
export default CourceModel;