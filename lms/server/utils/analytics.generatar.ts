
import { Document,Model } from "mongoose";

interface MonthData{
    month:string;
    count:number;
}
export async function generateLast12MonthData<T extends Document>(model:Model<T>):Promise<{last12Month:MonthData[]}>{
    const last12Month:MonthData[]=[];
   const currentData=new Date();
   currentData.setDate(currentData.getDate()+1);
   for(let i=11;i>=0;i--){
       const endData=new Date(
        currentData.getFullYear(),
        currentData.getMonth(),
        currentData.getDate()-i*28

       );
       const startdata=new Date(
        endData.getFullYear(),
        endData.getMonth(),
        endData.getDate()-28
       );

       const monthYear=endData.toLocaleString("default",{day:"numeric",month:"short",year:"numeric"});
         const count=await model.countDocuments({
              createdAt:{$gte:startdata,$lt:endData}
         });
         last12Month.push({month:monthYear,count});
   }
   return {last12Month};
}