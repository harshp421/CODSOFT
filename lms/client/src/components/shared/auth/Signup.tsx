"use client"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import React, { FC, useEffect, useState } from 'react'
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { EyeIcon, EyeOffIcon, Github } from "lucide-react"
import Image from "next/image"
import { useRegistrationMutation } from "@/redux/feature/auth/authApi"
import { useToast } from "@/components/ui/use-toast"

type Props = {
    setRoute: (route: string) => void;
}
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})
const Signup: FC<Props> = ({ setRoute }) => {
    // const [show, setShow] = useState(false);
    const [registration, { isError, isLoading, data, error, isSuccess }] = useRegistrationMutation();
    const { toast } = useToast()
    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration Successfull";
            toast({
                description: message,
            })
            setRoute('Verification')
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast({
                    variant: "destructive",
                    description: errorData.data.message,
                })
            }
        }

    }, [error, data])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
    const registerUser = async (values: z.infer<typeof formSchema>) => {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        await registration(values);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        registerUser(values)
    }
    
    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-center'>Join with Online Learning</DialogTitle>
                {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-2 py-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="xyz" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="xyz@gmail.com" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="******" {...field} />

                                    </FormControl>
                                    {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center items-center flex-col">
                            <h6>Or join With</h6>
                            <div className="flex w-full justify-evenly gap-x-2 mt-2 ">
                                <Button variant="outline" className="w-full " type="button"><Github /> GitHub  </Button>
                                <Button variant="outline" className="w-full " type="button">  <Image src='/icons/google.svg' alt="googl" width={25} height={25} /> Google</Button>
                            </div>
                            <h5 className="pt-3 ">
                                already have an account  ? <span onClick={() => setRoute('Login')} className="text-blue-500 cursor-pointer">Signup</span>
                            </h5>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full"> Sign-up</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>

        </>

    )
}

export default Signup