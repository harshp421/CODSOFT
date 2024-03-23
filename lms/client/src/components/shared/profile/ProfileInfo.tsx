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
import { useUpdateAvatarMutation, useUpdateUserNameMutation } from "@/redux/feature/user/userApi"
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice"
import { toast } from "@/components/ui/use-toast"



type IProfileInfoProps = {
    user: any;
    avatar?: string | null;
}
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
})

const ProfileInfo: FC<IProfileInfoProps> = ({ user, avatar }) => {
    const [loadUser, setLoadUser] = useState(false);
    const [updateAvatar, { isLoading, isSuccess, error }] = useUpdateAvatarMutation();
  const [updateUserName,{isSuccess:updateSuccess,error:updateError}]=useUpdateUserNameMutation()
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name ? user.name : "",
            email: user.email ? user.email : "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        updateUserName({name:values.name})
    }

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                const avatar = reader.result;
                updateAvatar(avatar)
            }
        }
        reader.readAsDataURL(file);

    }
    useEffect(() => {
        if (isSuccess || updateSuccess)  {
            setLoadUser(true);
        }
        if (error || updateError) {
            console.log(error)
        }
        if(updateSuccess)
        {
            toast({
                description: "Update Success",
            })
        }
    }, [isSuccess,error,updateSuccess,updateError])
    return (

        <>
            <div className="relative">
                <Image
                    src={user.avatar || avatar ? user.avatar.url || avatar : "/icons/user_avatar.jpg"}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="rounded-full w-[120px] h-[120px] cursor-pointer border-[3px]" />
                <input type="file"
                    name=""
                    id="avatar"
                    className="hidden"
                    onChange={(e) => handleAvatarChange(e)}
                    accept="image/*"
                />
                <label htmlFor="avatar">
                    <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex item-center justify-center
                cursor-pointer ">
                        <CameraIcon className="mt-1" />
                    </div>
                </label>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} readOnly />
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


export default ProfileInfo;