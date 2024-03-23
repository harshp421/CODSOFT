import React, { FC } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Props {
 open: boolean;
 setOpen: (open: boolean) => void;
 activeItem?: any;
 component: any;
 setRoute?: (route: string) => void;

}

const CustomeModel:FC<Props> = ({open,setOpen,setRoute,component:Component}) => {
  return (
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
   
    <DialogContent className="sm:max-w-[425px]">
      <Component  setOpen={setOpen} setRoute={setRoute} component={Component}/>
    </DialogContent>
  </Dialog>
  )
}

export default CustomeModel