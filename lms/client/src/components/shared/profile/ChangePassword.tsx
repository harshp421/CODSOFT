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
import { Input } from "@/components/ui/input"
import { FC, useEffect, useState } from "react"
import Image from "next/image"
import { CameraIcon } from "lucide-react"
import { useUpdateAvatarMutation, useUpdatePasswordMutation, useUpdateUserNameMutation } from "@/redux/feature/user/userApi"
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice"
import { toast } from "@/components/ui/use-toast"



type IProfileInfoProps = {
    user: any;
    avatar?: string | null;
}
const formSchema = z.object({
    oldpassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    newpassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmnewpassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).refine((data: any) => data.newpassword === data.confirmnewpassword, {
        message: "Passwords don't match",
        path: ["confirmnewpassword"],
    })
})

const ChangePassword: FC<IProfileInfoProps> = ({ user }) => {

    const [updatePassword, { isSuccess, error, data }] = useUpdatePasswordMutation()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldpassword: "",
            newpassword: "",
            confirmnewpassword: "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        updatePassword({ oldPassword: values.oldpassword, newPassword: values.newpassword })

    }


    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "user Password Updated successfully";
            toast({
                description: message,
            })
         form.reset();
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

    }, [isSuccess, error])
    return (

        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="oldpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" {...field}  />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmnewpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" {...field}  />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}


export default ChangePassword;