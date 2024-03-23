"use client"
import Header from '@/components/shared/header/Header'
import Profile from '@/components/shared/profile/Profile'
import Protected from '@/hooks/useProtected'
import Heading from '@/utils/Heading'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState('Login');
    const {user}=useSelector((state:any)=>state.auth);
    return (
        <div>
            <Protected>
                <Heading title={`${user?.name} profile`} description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
                <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
                {/* hero section */}
                 <Profile user={user}/>
            </Protected>

        </div>
    )
}

export default page