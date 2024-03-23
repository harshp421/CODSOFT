import AuthLayout from "@/layout/AuthLayout";
import HomeLayout from "@/layout/HomeLayout";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";


const Loadable = (Component: React.ComponentType<any>) => (props: any) =>
    (
        <Suspense fallback={<p>loading ...</p>}>
            <Component {...props} />
        </Suspense>
    );

const Home=Loadable(lazy(() => import("../pages/home/index")));
const AllPost=Loadable(lazy(() => import("../pages/allBloge/index")));
const Profile=Loadable(lazy(() => import("../pages/profile/index")));
const Register=Loadable(lazy(() => import("../pages/auth/Register")));
const Login=Loadable(lazy(() => import("../pages/auth/Login")));
const CreateBlog=Loadable(lazy(() => import("../pages/createBloge/index")));
const SingleBlogPage=Loadable(lazy(() => import("../pages/singleBlogPage/index")));

const routes=[
    {
        path:"auth",
        element:(
            <AuthLayout>
             <Outlet/>
            </AuthLayout>
        ),
        children:[
            {
                path:"register",
                element:<Register/>
                },
                {
                 path:"login",
                 element:<Login/>
                }
        ]
    }
   ,
     {
        path: "",
        element:(
        <HomeLayout>
          <Outlet />
        </HomeLayout>
        ),
        children:[
            {
                path:"",
                element:<Home/>
                },
                {
                 path:"/all-post",
                 element:<AllPost/>
                },
                {
                    path:"/profile",
                    element:<Profile />
                 },
                 {
                    path:"/creat-blog",
                    element:<CreateBlog />
                 },
                 {
                    path:"/blog/:id",
                    element:<SingleBlogPage/>
                 }
        ]
       
      },
    
]

export default routes;