import { CheckCheckIcon } from 'lucide-react'
import React, { FC } from 'react'

type IcourceOption = {
    active: number,
    setActive: (active: number) => void
}
const CourceOption: FC<IcourceOption> = ({ active, setActive }) => {
    const option = [
        "course infromation",
        "course Option",
        "course content",
        "course Preview"
    ]
    return (
        <>

            {
                option.map((opt, index) => {
                    return <div key={index} className='w-full flex  py-5 '>
                        <div className={`w-[35px] h-[35px] rounded-full flex item-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-gray-500"} relative`}>
                            <CheckCheckIcon className='text-[25px] mx-auto' />
                            {
                                index !== option.length-1 && (
                                    <div className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-gray-500"} bottom-[-95%]`} />


                                )
                            }
                        </div>
                        <h5 className='pl-2'>
                            {opt}
                        </h5>
                    </div>
                })
            }

        </>
    )
}

export default CourceOption