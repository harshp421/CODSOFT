import { Styles } from '@/styles/Custome.Styles';
import React from 'react';

const Reviews = () => {
    const reviews = [
        {
            name: 'John Doe',
            avatar: 'https://github.com/shadcn.png',
            profession: 'Web Developer',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
            profession: 'UI Designer',
            comment: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            name: 'Alice Johnson',
            avatar: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
            profession: 'Software Engineer',
            comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            name: 'Bob Williams',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            profession: 'Data Scientist',
            comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            name: 'Emily Davis',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            profession: 'Product Manager',
            comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            name: 'Michael Brown',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            profession: 'Full Stack Developer',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            name: 'Olivia Wilson',
            avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
            profession: 'UX Designer',
            comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            name: 'William Taylor',
            avatar: 'https://github.com/shadcn.png',
            profession: 'Frontend Developer',
            comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            name: 'Alexander Clark',
            avatar: 'https://github.com/shadcn.png',
            profession: 'Data Analyst',
            comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }
    ];

    return (
        <>
         <h1 className='text-4xl font-bold text-center leading-normal my-6'>Lets see our students  <span className={`${Styles.textGredient}`}>Reaction </span> 
        .</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full mr-2" />
                        <div>
                            <p className="font-semibold">{review.name}</p>
                            <p className="text-gray-500">{review.profession}</p>
                        </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                </div>
            ))}
        </div>
        </>
    );
};

export default Reviews;