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
import { useToast } from "@/components/ui/use-toast"



const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({message
    : "Invalid email address."}),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})


const Register = () => {
 const {toast} = useToast();
 const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const registerUser = async(values: z.infer<typeof formSchema>) => {
   
      try{
          const response = await AuthApi.register(values);
        //  console.log(response,"register value")
          if((response as { status: number })?.status === 200)
          {  
             toast({
              description: response.data.message,
             });
             navigate('/auth/login');
             
              
          }
          else {
            toast({
              description: response.data.message,
            })
          }
      }catch(error){
        console.log(error)
      }
  }
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
     registerUser(values);
    console.log(values)
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register Your self on our App.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <CardContent>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
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
            <Link to={'/auth/login'}>
            <p className="text-blue-500">   already have an account?Login  </p>
            </Link>
           </div>
            <div className="flex justify-between">


              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>


        </CardContent>

      </Form>
    </Card>
  )
}

export default Register;