"use client"
import Loader from '@/components/ui/Loader';
import { useGetSingleCourceQuery } from '@/redux/feature/cource/CourceApi';
import Heading from '@/utils/Heading';
import React, { FC, useEffect, useState } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CourseDetails from './CourceDetails';
import { useCreatePaymentIntendMutation, useGetStripePublicKeyQuery } from '@/redux/feature/order/OrderApi';

import {loadStripe} from '@stripe/stripe-js/pure';
import { configureStore } from '@reduxjs/toolkit';

type props={
  id:string

}
const CourseDetailsPage:FC<props> = ({id}) => {
   const [route,setRoute]= useState("Login");
   const [open,setOpen]= useState(false);
   const {data,isLoading}=useGetSingleCourceQuery(id);
   const{data:config}=useGetStripePublicKeyQuery({});
    const [stripePromise, setstripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');
    const [createPaymentIntend,{data:paymentIntentData}]=useCreatePaymentIntendMutation();

  console.log(data  ,"data");
    useEffect(() => {
        if (config) {
            const punlishbleKey=config.stripePublicKey;
           setstripePromise(loadStripe(punlishbleKey));
        }
        if(data){

         const amount=Math.round(data.cource.price*100);
         console.log(amount,"amount");
           createPaymentIntend(amount)
        }
    }, [config,data])


    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData.client_secret);
        }
    },[paymentIntentData] )
    

  return (
    <>
    {
      isLoading?<Loader/>:
      <>
      <div> 
      <Heading title={data && data.cource.name}description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
      <Header  open={open} setOpen={setOpen} activeItem={1} route={route} setRoute={setRoute}/>
       {
        stripePromise && <CourseDetails data={data.cource} stripePromise={stripePromise} clientSecret={clientSecret}/>
       }
      <Footer/>
      </div>
      </>
    }
     
    </>
  )
}

export default CourseDetailsPage