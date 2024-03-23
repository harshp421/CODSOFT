import AllBlog from '@/components/shared/AllBlog'
import Banner from '@/components/shared/Banner'
import Footer from '@/components/shared/Footer'
import Sidebar from '@/components/shared/Sidebar'
import { TypographyH2 } from '@/components/shared/TypographyH1'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import useGetCurrentUser from '@/hooks/useGetCurrentUser'
import { BlogApi } from '@/services/auth/BlogApi'
import { useEffect, useState } from 'react'




const index = () => {
  const currentUser=useGetCurrentUser();
  console.log(currentUser,"currentUser")

//  console.log(currentUser)
const [blogData, setBlogData] = useState(null)
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

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Banner Image */}
      <Banner />
      {/* banner image */}
      <TypographyH2 text={"letest Blog"} />
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
           <AllBlog blogList={blogData} fetchAllBlogs={fetchAllBlogs}/>
        </div>
      </ResizablePanel>
      </ResizablePanelGroup>
     
     <Footer/>

    </div>
  )
}

export default index