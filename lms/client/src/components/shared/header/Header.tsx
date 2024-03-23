"use client"
import { Sidebar, UserCircle2Icon } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react'
import SidebarView from './SidebarView';
import Navlinks from './Navlinks';
import { ModeToggle } from '../theame/ModeToggle';
import { Button } from '@/components/ui/button';
import CustomeModel from '@/utils/CustomeModel';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { Verification } from '../auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLogOutQuery, useSocialAuthMutation } from '@/redux/feature/auth/authApi';
import { toast } from '@/components/ui/use-toast';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}
export interface INavlinksData {
    name: string;
    link: string;
}

export const navlinksData: INavlinksData[] = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Courses",
        link: "/courses"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Contact",
        link: "/contact"
    },
    {
        name: "FAQ",
        link: "/faq"
    }
]
const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const { user } = useSelector((state: any) => state.auth);
    const { data } = useSession();
    const [socialAuth, { error, isSuccess }] = useSocialAuthMutation();

    const [logOut, setLogOut] = useState<boolean>(false);
    const { } = useLogOutQuery(undefined, {
        skip: !logOut ? true : false
    })
    useEffect(() => {
        if (!user) {
            if (data) {
                socialAuth({ email: data?.user?.email, name: data?.user?.name, avatar: data?.user?.image })
            }

        }
        if (data === null) {
            if (isSuccess) {
                toast({
                    description: "Login Success",
                })
            }
        }
        if (data === null) {
            setLogOut(true)
        }
    }, [data, user])
    return (
        <div className="w-full relative">
            <div className="flex justify-between items-center w-full p-5 md:p-10">
                <div className="text-3xl font-bold ">Online Learning</div>
                <div className='flex justify-center items-center gap-x-3'>

                    <Button variant="outline" size="icon" className='md:hidden ' onClick={() => setOpenSideBar(!openSideBar)}>
                        <Sidebar />
                    </Button>

                    <Navlinks navlinksData={navlinksData} />
                    <ModeToggle />

                    {
                        user ? (
                            <Link href='/profile'>
                                <Image src={user.avatar ? user.avatar.url : "/icons/user_avatar.jpg"} alt={user.name} width={15} height={15} className="h-10 w-10 rounded-full" />
                            </Link>
                        ) : (
                            <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
                                <UserCircle2Icon
                                />
                            </Button>
                        )
                    }


                </div>
            </div>
            {/* for mobile view */}
            <SidebarView openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} navlinksData={navlinksData} />
            {
                route === "Login" && open && (
                    <>
                        <CustomeModel open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} component={Login} />
                    </>
                )
            }
            {
                route === "Sign-up" && open && (
                    <>
                        <CustomeModel open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} component={Signup} />
                    </>
                )
            }
            {
                route === "Verification" && open && (
                    <>
                        <CustomeModel open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} component={Verification} />
                    </>
                )
            }
        </div>
    )
}

export default Header