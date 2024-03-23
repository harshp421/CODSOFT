import React, { useEffect, useState } from 'react'
import { TypographyH2 } from '@/components/shared/TypographyH1'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import AllBlog from '@/components/shared/AllBlog'
import { SearchForm } from '@/components/forms/SearchForm'
import Sidebar from '@/components/shared/Sidebar'
import { BlogApi } from '@/services/auth/BlogApi'

const index = () => {

  
//  console.log(currentUser)
const [blogData, setBlogData] = useState(null);
const [blogCategory,setBlogCategory]=useState(null)
const fetchAllBlogs = async () => {
  try {
    const response = await BlogApi.ListAllBlogs();
    setBlogData(response.data.blogs);
  } catch (error) {
    console.log(error);
  }
};
const fatchAllBlogsCategory=async()=>{
  try
  {
   const response=await BlogApi.ListAllBlogsCategory();
   setBlogCategory(response.data.uniqueTags)

  }catch(error)
  {
    console.log(error)
  }
}


useEffect(() => {
  fetchAllBlogs();
  fatchAllBlogsCategory();
  
}, []);
const handleSetBlogData = (data:any) => {
  setBlogData(data);
};

  return (
    <div className='mt-5'>
     <div className='flex justify-between border-b '>
     <TypographyH2 text={"All Blogs"}/>
       <div>
        <SearchForm setBlogData={handleSetBlogData}/>
       </div>
     </div>
      <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] max-w-7xl mx-auto rounded-lg pt-20"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full  p-6">
          <Sidebar blogCategory={blogCategory}/>    
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
           <AllBlog blogList={blogData}/>
        </div>
      </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default index