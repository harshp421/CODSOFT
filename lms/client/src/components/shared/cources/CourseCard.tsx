"use client";
import Ratings from '@/utils/Ratings'
import Link from 'next/link'
import React, { FC } from 'react'
type IcourseProp = {
  item: any
  isProfile?: boolean
}
const CourseCard: FC<IcourseProp> = ({ isProfile, item }) => {
  return (
    <Link href={!isProfile ? `/courses/${item._id}` : `course-access/${item?._id}`}>
      <div className='relative  rounded-lg shadow-md overflow-hidden border'>
        <div className='relative h-48 w-full'>
          <img
            src={item?.thumbnail?.url ? item?.thumbnail?.url : "/icons/user_avatar.jpg"}
            alt='course'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='p-4'>
          <h1 className='text-lg font-bold '>{item?.name}</h1>
          <p className='text-sm '>{item?.description.slice(0, 15)}</p>

          <div className='mt-1 flex items-center justify-between'>
            <div className='flex items-center'>
              <Ratings rating={item?.ratings} />
            </div>
            <p className='text-sm '>{item?.purchased} Students</p>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex'>
              <h1 className="mt-1 text-[25px]">
                {item?.price === 0 ? "free" : item?.price + "$"}
              </h1>
              <h5 className='pl-3 text-[20px] mt-1 line-through opacity-80'>
                {item?.estimatedPrice}
              </h5>
            </div>
            <div>
              {item.courceData.length > 0 && <p className='text-sm '>{item.courceData.length} Lectures</p>}
            </div>

          </div>
        </div>
      </div>

    </Link>

  )
}

export default CourseCard