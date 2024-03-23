
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploder from "../shared/FileUploder"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { BlogApi } from "@/services/auth/BlogApi"



export const postFormSchema = z.object({
  title: z.string().min(2).max(2200), // Added required field
  description: z.string().min(2).max(2200), // Corrected field name
  category: z.string(), // Added field
  tags: z.any(),
  file: z.custom<File[] |string>(),
  readTime: z.string(),
})
type postformProp = {
  post?: any;
  action: 'Create' | 'Update'
}
const PostBlogForm = ({ post, action }: postformProp) => {

  const { toast } = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      category: post?.category || "",
      tags: post?.tags?.join(",") || "",
      file: [],
      readTime: post?.readTime || 0,

    },
  })
  const createBlog = async(values: z.infer<typeof postFormSchema>) => {
    try {
      const response = await BlogApi.createBlog(values);
      console.log(response,"create blog responce")
      if (response.status === 200) {
        toast({
          description: response.data.message,
        });
        navigate("/");
      }
      else {
        toast({
          description: response.data.message,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    console.log(values)
    values.tags=values.tags.split(",");
    values.file="https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    createBlog(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-7xl mx-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Enter Blog Title</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Enter Your Blog Contant </FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scroll" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Enter Blog Category</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos </FormLabel>
              <FormControl>
                <FileUploder fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (sepreted by comma ",") </FormLabel>
              <FormControl>
                <Input placeholder="art,expression,learn" type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="readTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label"> Enter Read Time</FormLabel>
              <FormControl>
                <Input placeholder="Enter Blog Read-Time" type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">Cancle</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap" >
            Post
          </Button>
          {/* <Button type="submit" className="shad-button_primary whitespace-nowrap" disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || isLoadingUpdate && 'loading...'}
             {action} Post
            </Button> */}
        </div>

      </form>
    </Form>
  )
}

export default PostBlogForm