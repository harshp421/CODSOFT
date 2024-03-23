"use client"
import { redirect } from "next/navigation";
import useAuth from "./useAuth";

interface proctedProp{
    children:React.ReactNode

}

export default function  Protected({children}:proctedProp)
{
   
const isAunthenticated=useAuth();
console.log(isAunthenticated)

return isAunthenticated?children:redirect('/')
}