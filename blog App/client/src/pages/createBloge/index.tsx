import PostBlogForm from '@/components/forms/PostBlogForm'
import useGetCurrentUser from '@/hooks/useGetCurrentUser'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const index = () => {
   const currentUser =useGetCurrentUser();  
   console.log(currentUser,"currentUser in creta")
   const navigate=useNavigate();
 
     
      if(currentUser==null)
      {
        navigate('/auth/login')
      }
    
  return (
    <div>
       <PostBlogForm/>
    </div>
  )
}

export default index




