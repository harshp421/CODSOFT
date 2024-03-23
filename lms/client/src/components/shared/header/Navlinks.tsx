import React, { FC } from 'react'
import { INavlinksData } from './Header'
import Link from 'next/link';


const Navlinks: FC<{ navlinksData: INavlinksData[] }> = ({ navlinksData }) => {
    return (
        <div className="hidden md:flex space-x-6">
            {navlinksData.map((item: INavlinksData, index: number) => (
                <Link href={item.link} key={index} className="text-lg font-semibold  hover:text-blue-500 cursor-pointer">
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default Navlinks