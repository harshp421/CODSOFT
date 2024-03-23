import { redirect } from "next/navigation";
import useAuth from "./useAuth";
import { useSelector } from "react-redux";

interface proctedProp{
    children:React.ReactNode

}

export default function  Protected({children}:proctedProp)
{
   const {user}=useSelector((state:any)=>state.auth);
const isAdmin=user?.role==="admin"?true:false;

return isAdmin?children:redirect('/')
}