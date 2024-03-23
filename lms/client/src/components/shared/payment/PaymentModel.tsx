import React, { FC } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

type PaymentModelProps = {
  stripePromise:any,
 clientSecret:any,
 open:boolean,
 setOpen:(open:boolean)=>void,
 data:any
}

const PaymentModel:FC<PaymentModelProps> = ({stripePromise,clientSecret,open,setOpen,data}) => {
  return (
    <div>
       {
      stripePromise &&  clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
             <PaymentForm  open={open} setOpen={setOpen} data={data}/>
      </Elements>
      )
    }
    </div>
  )
}

export default PaymentModel