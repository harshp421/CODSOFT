"use client";
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import Ratings from '@/utils/Ratings';
import CourcePlayer from '../admin/player/CourcePlayer';
import CourceContentList from './CourceContentList';
import CustomeModel from '@/utils/CustomeModel';
import PaymentModel from '../payment/PaymentModel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useLoadUserQuery } from '@/redux/feature/api/apiSlice';

type CourceDetailsProps = {
    data: any;
    stripePromise: any;
    clientSecret: string;
}

const CourceDetails: FC<CourceDetailsProps> = ({ data ,stripePromise,clientSecret}) => {
    const [open, setOpen] = useState(false)
   // const { user } = useSelector((state: any) => state.auth);
    const {data:userData}=useLoadUserQuery(undefined,{});
    const user=userData?.user;
    const discountPercentage = ((data.estimatedPrice - data?.price) / data.estimatedPrice * 100).toFixed(0);
    const isPurchased = user?.cources.some((cource: any) => cource.courceId === data._id);

    const handleOrder = () => {
        console.log("Order placed");
        setOpen(true);
    }

    const handleNavigate = () => {
        redirect(`/course-access/${data._id}`)
    }
    return (
        <div className=" w-[90%] md:w-[90%] m-auto py-5 ">
        <div className="flex w-full flex-col-reverse md:flex-row gap-x-3">
      
        <div className="p-4 w-full md:w-[65%] border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className=' '>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mt-8">
                <div className="w-2/3">
                    <h1 className="text-4xl font-bold">{data?.name}</h1>
                   
                    <div className="flex items-center mt-2">
                        <Ratings rating={data?.ratings} />
                        <p className="ml-2 text-sm text-gray-500">({data?.reviews?.length} Reviews)</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <h2 className="text-3xl font-bold">${data?.price}</h2>
                    <p className="text-sm text-gray-500 line-through">${data?.estimatedPrice}</p>
                    <p className="text-sm text-green-500">{discountPercentage}% off</p>
                    
                </div>
            </div>

            
            <div className="mt-8">
                <h3 className="text-2xl font-bold">What You Will Learn From This Course</h3>
                <ul className="list-disc list-inside mt-2">
                    {data?.benefits?.map((item: any, index: number) => (
                        <li key={index} className="text-lg">{item?.title}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold">Prerequisites</h3>
                <ul className="list-disc list-inside mt-2">
                    {data?.prerequisites?.map((item: any, index: number) => (
                        <li key={index} className="text-lg">{item?.title}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold">Course Details:</h3>
                <p className="mt-2 text-lg">{data?.description}</p>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold">Course Oveeview</h3>
               
                    <div  className="mt-4">
                         <CourceContentList data={data.courceData}  />
                    </div>
            
            </div>
        </div>
    
          
          </div>

        </div>

        <div className='w-full md:w-[35%] relative '>
        <div className='sticky top-[100px] left-0 z-50 w-full'>
        <CourcePlayer title={data?.name} videoUrl={data?.demoUrl} />
         <div className='py-5'>
         {isPurchased ? (
                        <Link href={`/course-access/${data._id}`} className='bg-blue-400 p-2 rounded' >Enter The Cource</Link>
                    ) : (
                        <Button onClick={handleOrder}>Buy Now</Button>
                    )}
        
         </div>
       <p className="pb1"> * Source Code Include </p>
         <p className="pb1">* Full LifeTime Access</p>
         <p className="pb1">* Cirtification of Complete</p>
         <p className="pb1">*Premium Support </p>
        </div>
    

         </div>
        </div>
        <>
         {
            open && (
                <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
   
                <DialogContent className="sm:max-w-[425px]">
                    <PaymentModel stripePromise={stripePromise} clientSecret={clientSecret} open={open} setOpen={setOpen} data={data} />
                </DialogContent>
              </Dialog>
            )
         }
        
        </>
      </div>
    );
}

export default CourceDetails;
