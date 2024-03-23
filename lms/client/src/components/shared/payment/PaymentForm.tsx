"use client"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useLoadUserQuery } from '@/redux/feature/api/apiSlice';
import { useCreateCourceMutation } from '@/redux/feature/cource/CourceApi';
import { useCreateOrderMutation } from '@/redux/feature/order/OrderApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { set } from 'zod';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any
}

const PaymentForm = (props: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { } = useLoadUserQuery({ ship: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  console.log(props.data, "data");
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message ? error.message : "Something went wrong");
      setIsLoading(false);
    }
    else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courceId: props.data._id ,payment_info:paymentIntent})
    }



  }

  useEffect(() => {
    if (orderData) {
      
      setLoadUser(true);
      redirect(`/course-access/${props.data._id}`)
    }
  if(error)
  {
    if("data" in error)
    {
      const errorMessage=error as any;
      toast({
        description:errorMessage.data.message,
      })
    }
  }
  },[orderData,error])
  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id='payment-element' />
      <Button disabled={isLoading || !stripe || !elements}>
        {
          isLoading ? "Loading..." : "Pay Now"
        }
      </Button>
      {
        message && (
          <div id='payment-message' className='text-[red] '>
            {message}
          </div>
        )
      }
    </form>
  )
}

export default PaymentForm