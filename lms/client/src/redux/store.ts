"use client"
import  {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './feature/api/apiSlice'
import authSlice from './feature/auth/authSlice'
export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice
    },
    // devTools:false,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})  

//call the refress token funvtion in every page load

const initializeApp=async()=>{
    await store.dispatch(apiSlice.endpoints.refressToken.initiate({},{forceRefetch:true}))
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}))

}

initializeApp();