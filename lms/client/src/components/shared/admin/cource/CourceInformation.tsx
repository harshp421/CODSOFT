import React, { FC, useState } from 'react'
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

type ICourceInfoProp = {
    courceInfo: any;
    setCourceInfo: (courceInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name is required",
    }),
    description: z.string().nonempty({ message: "Description is required" }),
    price: z.string().nonempty({ message: "Price is required" }),
    estimatedPrice: z.string().nonempty({ message: "Estimated Price is required" }),
    tags: z.string().nonempty({ message: "Tags is required" }),
    levels: z.string().nonempty({ message: "Levels is required" }),
    demoUrl: z.string().nonempty({ message: "Demo Url is required" }),
    thumbnail: z.string().nonempty({ message: "Thumbnail is required" }),

})
const CourceInformation: FC<ICourceInfoProp> = ({courceInfo,setCourceInfo,active,setActive}) => {
    const [dragging, setDragging] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            estimatedPrice: "",
            tags: "",
            levels: "",
            demoUrl: "",
            thumbnail: "",
        },
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0]
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                const avatar = reader.result;
                form.setValue("thumbnail", avatar as string)
            }
        }
        reader.readAsDataURL(file);
    }

    const handleDrugOver = (e: any) => {
        e.preventDefault();
        setDragging(true);

    }
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    }
    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];

        if (file) {
            const reader: any = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const avatar = reader.result;
                    form.setValue("thumbnail", avatar as string)
                }
            }
            reader.readAsDataURL(file);
        }

    }

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setCourceInfo(values);
        setActive(active + 1)
    }
    return (
        <div className="w-[80%] m-auto mt-26 p-3">
            <h1 className='text-2xl my-2'>Cource Information :</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='w-[100%]'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Cource Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-[100%]'>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Cource description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-[100%] flex justify-between'>
                        <div className='w-[45%]'>
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Cource Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[45%]'>
                            <FormField
                                control={form.control}
                                name="estimatedPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Cource Eestimeted</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Cource Tage</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-[100%]'>
                        <FormField
                            control={form.control}
                            name="levels"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Cource levels</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-[100%]'>
                        <FormField
                            control={form.control}
                            name="demoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Cource demoUrl</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className='w-[100%]'>
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Upload Thumbnail</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="thumbnail"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                            />
                                            <div className="flex items-center justify-center w-full h-[300px] bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg">
                                                {form.watch("thumbnail") && form.watch("thumbnail") !== "" ? (
                                                    <img src={form.watch("thumbnail")} alt="Thumbnail" className="w-full h-full object-cover" />
                                                ) : (
                                                    <label
                                                        htmlFor="thumbnail"
                                                        className={`flex flex-col items-center space-y-1 text-center cursor-pointer ${dragging ? 'bg-blue-500' : ''}`}
                                                        onDragOver={handleDrugOver}
                                                        onDragLeave={handleDragLeave}
                                                        onDrop={handleDrop}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-8 h-8 text-gray-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="text-sm text-gray-400">
                                                            Drag and drop or click to upload
                                                        </span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CourceInformation