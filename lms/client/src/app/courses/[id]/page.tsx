"use client"
import CourseDetailsPage from '@/components/shared/cources/CourseDetailsPage'
import React from 'react'

const Page = ({params}:any) => {
  return (
    <div>
        <CourseDetailsPage id={params.id}/>
    </div>
  )
}

export default Page