
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggineIn } from '../auth/authSlice';
export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery(
        {baseUrl:process.env.NEXT_PUBLIC_SERVER_URL}
        ),
    endpoints:(builder)=>({
    
    //this will run every time we refress the page 
    //and we will get the user data from the server
    refressToken:builder.query({
        query:(data)=>({
         url:"refresh",
         method:"GET",
         credentials:"include" as const,
        })
    }),
    loadUser:builder.query({
        query: () => ({
            url: "me",
            method: "GET",
            credentials: "include" as const,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
                const result = await queryFulfilled;    
                dispatch(
                    userLoggineIn({
                        token: result.data.accessToken,
                        user:result.data.user
                    })
                );
            } catch (error) {
                console.log(error);
            }
        }

    
    })
    })
})

export const {useRefressTokenQuery,useLoadUserQuery}=apiSlice;