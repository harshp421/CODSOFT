"use client"
import PaidCourceContent from '@/components/shared/admin/cource/PaidCourceContent'
import Loader from '@/components/ui/Loader'
import { useLoadUserQuery } from '@/redux/feature/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    params: any
}

const page = ({ params }: Props) => {
    const id = params.id;
    const { data, isLoading, error } = useLoadUserQuery(undefined,{});

    useEffect(() => {
        if (data) {
            const isPurchased = data?.user?.cources?.some((cource: any) => cource.courceId === id);
            if (!isPurchased) {
                redirect(`/`)

            }
        }
        if(error)
        {
            redirect(`/`)
        }

    }, [data,error])


    return (
        <>
        {
            isLoading ?(
                <Loader/>
            ):(
                 <PaidCourceContent courceId={id}/>
            )
        }
        </>
    )
}

export default page