import { apiSlice } from "../api/apiSlice";


export const orderApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       getStripePublicKey:builder.query({
            query:()=>({
                url:"/payment/sendPublicKey",
                method:"GET",
                credentials:'include' as const 
            }) 
         }),
         createPaymentIntend:builder.mutation({
            query:(amount)=>({
                url:"/payment/newpayment",
                method:"POST",
                body:{amount},
                credentials:'include' as const 
            })   
         }),
         createOrder:builder.mutation({
            query:({courceId,payment_info})=>({
                url:"new-order",
                method:"POST",
                body:{
                    courceId,
                    payment_info
                
                },
                credentials:'include' as const 
            })   
         }),
    })
   
})

export const {useGetStripePublicKeyQuery,useCreatePaymentIntendMutation,useCreateOrderMutation}=orderApi;