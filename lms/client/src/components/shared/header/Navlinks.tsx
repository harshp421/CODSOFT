"use client";
import React, { FC } from 'react'
import { INavlinksData } from './Header'
import Link from 'next/link';

type NavlinksProps = {
    navlinksData: INavlinksData[];
    activeItem?:number;
    
}


const Navlinks: FC<NavlinksProps> = ({ navlinksData,activeItem }) => {
    return (
        <div className="hidden md:flex space-x-6">
            {navlinksData.map((item: INavlinksData, index: number) => (
                <Link href={item.link} key={index} className={`text-lg font-semibold ${activeItem === index ?"text-blue-500":""}  hover:text-blue-500 cursor-pointer`}>
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default Navlinks