"use client";
import { useGetAllCourcesUserQuery } from '@/redux/feature/cource/CourceApi'
import { Styles } from '@/styles/Custome.Styles'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';

const Cources = () => {
  const { data, isLoading } = useGetAllCourcesUserQuery({});
  const [course, setCourse] = useState<any[]>([])
  useEffect(() => {
    setCourse(data?.allCources)
  }, [data])
  return (
    <>
      <div className='w-[90%] mx-auto mt-[150px] 800px:w-[80%]'>
        <h1 className='text-4xl font-bold text-center leading-normal'>Unlock Your Potential with <span className={`${Styles.textGredient}`}>Comprehensive <br /> Project-Based</span>  Courses for Career Growth
          .</h1>
        <br />
        <br />
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2  lg:grid-cols-3 mb-12 border-0 '>
          {
            course && course.map((item: any, index: number) => (
              <CourseCard
                item={item}
                key={index}
              />
            ))
          }
        </div>

      </div>
    </>
  )
}

export default Cources