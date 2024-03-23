import AxiosInstance from "../middleware"

export const AuthApi={
    register:async (data:any)=>{
        try{
            const response=await AxiosInstance.post("/user/register",data);
            return response;
        }catch(error)
        {
         console.log(error)
         return error?.response;
        }
    },
    login:async (data:any)=>{
       try{
        const response=await AxiosInstance.post("/user/login",data);
         return response;
       }catch(error)
       {
        console.log(error)
        return error?.response;
       }
    }
}