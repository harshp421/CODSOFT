import mongoose,{Model,Schema,Document} from "mongoose";

export interface IOrder extends Document {
    courceId:any;
    userId:string;
    payment_info:object
}

const orderSchema:Schema<IOrder>=new Schema({
    courceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cource',
        required:true
    },
    userId:{
         type:String,
        required:true
    },
    payment_info:{
        type:Object,
       
    }
},{timestamps:true});
const OrderModel:Model<IOrder>=mongoose.model('Order',orderSchema);
export default OrderModel;