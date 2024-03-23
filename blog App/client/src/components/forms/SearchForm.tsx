
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
import { SearchIcon } from "lucide-react"
import { BlogApi } from "@/services/auth/BlogApi"

const formSchema = z.object({
  searchValue: z.string().min(1).max(100),
})

export function SearchForm({setBlogData}:any) {
  


  const fatchAllBlogByseach=async(query:string)=>{
    try
    {
     const response=await BlogApi.searchBlog(query);
     setBlogData(response.data.blogs)
  
    }catch(error)
    {
      console.log(error)
    }
  }
  

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          searchValue: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        fatchAllBlogByseach(values.searchValue)
        console.log(values)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
         <div className="flex items-center gap-x-3 mb-5">
         <FormField
          control={form.control}
          name="searchValue"
          render={({ field }) => (
            <FormItem>
                 <FormMessage />
              <FormControl>
                <Input placeholder="Search" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit"><SearchIcon/></Button>
         </div>
      </form>
    </Form>
  )
}
