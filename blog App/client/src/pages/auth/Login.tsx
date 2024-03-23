import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Link, useNavigate } from "react-router-dom"
import { AuthApi } from "@/services/auth/AuthApi"
import { toast, useToast } from "@/components/ui/use-toast"



const formSchema = z.object({
 email: z.string().email({message
    : "Invalid email address."}),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})


const Login = () => {
 const {toast}=useToast();
 const navigation=useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

   const loginUser=async(values: z.infer<typeof formSchema>)=>{
     try{ 
        const response=await AuthApi.login(values);
        if(response.status===200)
        { 
          toast({
            description:response.data.message,
          });
          localStorage.setItem("user",JSON.stringify({...response.data.user,token:response.data.token}));
          navigation("/");        

        }
        else{
          toast({
            description:response.data.message,
          });
        }
     }catch(error)
     {
     console.log(error);
     }
  }
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
     loginUser(values)
    console.log(values)
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <CardContent>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your email" {...field} />
                  </FormControl>
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
           <div>
            <Link to={'/auth/register'}>
            <p className="text-blue-500">Don't have an account? Register</p>
            </Link>
           </div>
            <div className="flex justify-between">


              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>


        </CardContent>

      </Form>
    </Card>
  )
}

export default Login;