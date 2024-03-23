import { Fragment, useState } from 'react'



import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import { ModeToggle } from '../ui/mode-toggle'
import { Link } from 'react-router-dom'

export default function Example() {
 

  return (
    <header >
       <Drawer>
      <nav className="mx-auto flex max-w-7xl items-center justify-between  p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            <h1>Hunter Blog</h1>
          </a>
        </div>
       
        <div className="flex lg:hidden">     
          <DrawerTrigger className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 border-2' >Open</DrawerTrigger>
          
        </div>
        <div className="hidden lg:flex lg:gap-x-12">    
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
         
          <Link  to="" className="text-sm font-semibold leading-6 ">
            Home
          </Link>
          <Link to="/all-post" className="text-sm font-semibold leading-6 ">
            All-Blogs
          </Link>
          <Link to="/creat-blog" className="text-sm font-semibold leading-6 ">
            Create-blog
          </Link>
          <Link to="/auth/login" className="text-sm font-semibold leading-6 me-2">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className='hidden lg:block'>
        <ModeToggle />
        </div>
       
      </nav>
      </Drawer>
    </header>
  )
}
