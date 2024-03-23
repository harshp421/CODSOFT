import { apiSlice } from "../api/apiSlice";


export const courceApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createCource:builder.mutation({
        query:(data)=>({
            url:"create-cource",
            method:"POST",
            body:data,
            credentials:'include' as const 
        })   
       }),
       getAllCourceAdmin:builder.query({
          query:()=>({ 
            url:"/get-all-course",
            method:"GET",
            credentials:'include' as const 
          })
       }),
       getAllCourcesUser:builder.query({
        query:()=>({
            url:"/get-courses",
            method:"GET",
            credentials:'include' as const 
        }) 
       }),
       getSingleCource:builder.query({
        query:(id)=>({
            url:`/get-course/${id}`,
            method:"GET",
            credentials:'include' as const 
        }) 
       }),
       getCourceContent:builder.query({
        query:(id)=>({
            url:`/get-course-content/${id}`,
            method:"GET",
            credentials:'include' as const 
        }) 
       }),
    })
   
})

export const {useCreateCourceMutation ,useGetAllCourceAdminQuery,useGetAllCourcesUserQuery,useGetSingleCourceQuery,useGetCourceContentQuery}=courceApi;