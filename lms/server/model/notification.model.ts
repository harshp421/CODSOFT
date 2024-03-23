import mongoose,{Model,Schema,Document} from "mongoose";

export interface INotification extends Document {
     title:string;
    userId:string;
    message:string;
 status:string;   
}

const notificationSchema:Schema<INotification>=new Schema({
    title:{
        type:String,
        required:true
    },
    userId:{
         type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"unread"
    }
},{timestamps:true});

const NotificationModel:Model<INotification>=mongoose.model('Notification',notificationSchema);
export default NotificationModel;