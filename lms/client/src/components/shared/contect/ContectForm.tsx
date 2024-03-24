import React from 'react'

 
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
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
 
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  
  }),
    subject: z.string().min(2, {
        message: "Subject must be at least 2 characters.",
    }),
    message: z.string().min(6, {
        message: "Message must be at least 6 characters.",
    }),
})
 
const ContectForm = () => {
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className='h-scree w-full max-w-4xl mx-auto'>
        <div className='flex  flex-col justify-center items-center'>
         <h1  className='font-bold text-3xl text-center'>
           Contect Us
         </h1>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter Yous Subject" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Messagee</FormLabel>
            <FormControl>
              <Textarea placeholder="Leave a Comment" {...field} cols={25} rows={20}/>
            </FormControl>
          
            <FormMessage />
          </FormItem>
        )}
      />
        <Button type="submit" size={'lg'}>Submit</Button>
      </form>
    </Form>
        </div>
    </div>
  )
}

export default ContectForm