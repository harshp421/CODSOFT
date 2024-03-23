import React from 'react'
import { Badge } from '../ui/badge';

const Sidebar = ({blogCategory}:any) => {
  console.log(blogCategory,"blogCategory" )
  return (
    <div>
     <h3 className='mb-2'>Polular Tegs</h3>
      <div className="badge_section">
        {blogCategory &&  blogCategory.map((tag, index) => {
          return (
             <Badge key={index} className="mr-2 mb-2" >
                {tag?._id}
                </Badge>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar