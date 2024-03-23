"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import React, { useEffect } from "react"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useActivationMutation } from "@/redux/feature/auth/authApi"
import { useSelector } from "react-redux"
import { toast } from "@/components/ui/use-toast"
// import { toast } from "@/components/ui/use-toast"

interface Props {
  setRoute: (route: string) => void
}
const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function Verification({ setRoute }: Props) {
  const {token}=useSelector((state:any)=>state.auth);
  const [activation,{isSuccess,error,data}]=useActivationMutation();

 
  useEffect(()=>{
    if(isSuccess){
      toast({
      description:data.message
      })
      setRoute('Login')
    }
    if(error){
      if("data"in error){
        const errorData=error as any;
        toast({
          description:errorData.data.message
        
        })
      }
    }
  },[isSuccess,error])
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  const varifyNumber = async(data: z.infer<typeof FormSchema>) => {
    try {
      await activation({activationCode:data.otp,activationToken:token})
    } catch (error) {
      console.log(error)
    }
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
     varifyNumber(data);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-center'>Verify Your OTP</DialogTitle>
        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col justify-center items-center gap-2  w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6  ">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl >
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className="">
                          {slots.map((slot, index) => (
                            <React.Fragment key={index}>
                              <InputOTPSlot className="rounded-md border" {...slot} />
                              {index !== slots.length - 1 && <InputOTPSeparator />}
                            </React.Fragment>
                          ))}{" "}
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full mx-auto"> Sign-up</Button>
            </DialogFooter>
            <div className="flex justify-center items-center flex-col">
                           
                            <h5 className="pt-3 ">
                               Go Back to Sign in  ? <span onClick={() => setRoute('Login')} className="text-blue-500 cursor-pointer">Signup</span>
                            </h5>
                        </div>
          </form>
        </Form>
      </div>
    </>
  )
}
