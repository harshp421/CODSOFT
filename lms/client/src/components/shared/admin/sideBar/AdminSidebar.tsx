"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Activity, Book, Inbox, User, Users, Settings, Briefcase,  Eye, Newspaper } from 'lucide-react';

interface SidebarItem {
   label: string;
   icon: any;
   href: string;
 }
 
 interface SidebarGroup {
   title?: string;
   children?: SidebarItem[];
 }
 


type Props = {
    openSidebar: boolean;
    setOpenSidebar: (openSidebar: boolean) => void;
};

const sidebarItems: any = [
   { label: "Dashboard", icon: <Activity />, href: "/adminDashboard" },
   {
     title: "User",
     children: [
       { label: "All-User", icon: <User />, href: "/adminDashboard/users" },
       { label: "Invoice", icon: <Eye />, href: "#" },
     ]
   },
   {
     title: "Content",
     children: [
       { label: "Create Courses", icon: <Book />, href: "/adminDashboard/create-cource" },
       { label: "Live Course", icon: <Settings />, href:"/adminDashboard/all-cource" },
     ]
   },
   {
      title:"Customization",
      children:[
         { label: "Hero", icon: <Inbox />, href: "#" },
         { label: "FAQ", icon: <Newspaper />, href: "#" },
         { label: "Caterories", icon: <Briefcase />, href: "#" },
      ]
   },
   {
      title:"Controllers",
      children:[
         { label: "Manage Team", icon: <Users />, href: "#" },
      ]
   },
   {
     title:"analytics",
       children:[
         { label: "Cource Analytics", icon: <Eye />, href: "#" },
         { label: "Order Analytics", icon: <Eye />, href: "#" },
         { label: "User Analytics", icon: <Eye />, href: "#" },
       ]
   }
 ];
 
const AdminSidebar = ({ openSidebar, setOpenSidebar }: Props) => {
   

    return (
        <>
          <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform border-r border-gray-200 ${openSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
      <div className="h-full px-3 pb-4 overflow-y-auto">
        {sidebarItems.map((item :any, index:number) => (
          <React.Fragment key={index}>
            {item.title && <p>{item.title}</p>}
            {Array.isArray(item.children) ? (
              item.children.map((child :any, childIndex :number) => (
                <a key={childIndex} href={child.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  {child.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">{child.label}</span>
                </a>
              ))
            ) : (
              <a href={item.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {item.icon}
                <span className="flex-1 ms-3 whitespace-nowrap">{item.label}</span>
              </a>
            )}
          </React.Fragment>
        ))}
      </div>
    </aside>
        </>
    );
};

export default AdminSidebar;
