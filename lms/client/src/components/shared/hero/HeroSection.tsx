"use client"
import { Button } from '@/components/ui/button'
import { Styles } from '@/styles/Custome.Styles'
import React from 'react'

const HeroSection = () => {
    return (
        <div className=' w-full flex justify-center items-center flex-col '>
            <div className=' mt-20   '>
                <div className='mt-7' >
                    <h1 className='text-5xl font-bold text-center leading-normal'>Unleash your inner <span className={`${Styles.textGredient}`}>programming</span><br />
                       <span className={`${Styles.textGredient}`}> genius </span>with our community.</h1>
                    <h5 className='text-1xl text-center font-semibold'>Empower your programming journey with Online Learning<br />
                        dedicated community and comprehensive resources.</h5>
                </div>
               <div className='flex justify-center  items-center mt-4'> <Button variant="default" size="lg" className=' font-bold text-1xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 '>Get Started</Button></div>
            </div>
        </div>
    )
}

export default HeroSection