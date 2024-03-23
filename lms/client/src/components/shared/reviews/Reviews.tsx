import { Styles } from '@/styles/Custome.Styles';
import React from 'react';

const Reviews = () => {
    const reviews = [
        {
            name: 'John Doe',
            avatar: 'https://example.com/avatar1.png',
            profession: 'Web Developer',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar2.png',
            profession: 'UI Designer',
            comment: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            name: 'Alice Johnson',
            avatar: 'https://example.com/avatar3.png',
            profession: 'Software Engineer',
            comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            name: 'Bob Williams',
            avatar: 'https://example.com/avatar4.png',
            profession: 'Data Scientist',
            comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            name: 'Emily Davis',
            avatar: 'https://example.com/avatar5.png',
            profession: 'Product Manager',
            comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            name: 'Michael Brown',
            avatar: 'https://example.com/avatar6.png',
            profession: 'Full Stack Developer',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            name: 'Olivia Wilson',
            avatar: 'https://example.com/avatar7.png',
            profession: 'UX Designer',
            comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            name: 'William Taylor',
            avatar: 'https://example.com/avatar8.png',
            profession: 'Frontend Developer',
            comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            name: 'Sophia Anderson',
            avatar: 'https://example.com/avatar9.png',
            profession: 'Backend Developer',
            comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            name: 'James Martinez',
            avatar: 'https://example.com/avatar10.png',
            profession: 'UI/UX Designer',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            name: 'Emma Thompson',
            avatar: 'https://example.com/avatar11.png',
            profession: 'Software Engineer',
            comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            name: 'Alexander Clark',
            avatar: 'https://example.com/avatar12.png',
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