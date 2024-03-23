import { useEffect, useState } from 'react';

const useGetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    },[]);

    return currentUser;
};

export default useGetCurrentUser;