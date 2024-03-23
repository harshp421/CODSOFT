
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from '../ui/badge'
import { Command, Heart } from 'lucide-react'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { multiFormatDateString } from "@/lib/utils"
import { BlogApi } from "@/services/auth/BlogApi"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"



const AllBlog = ({ blogList, fetchAllBlogs }: any) => {
  const [blogs, setBlogs] = useState<any>(null);
  const currentUser :any= useGetCurrentUser();

  useEffect(() => {
    setBlogs(blogList)
  }, [blogList])

  console.log(blogList, "blogs")

  const giveLiketoBlog = async (blogId: any) => {
    try {
      const response = await BlogApi.giveLikeToBlog(blogId);
      //console.log(response, "responce")
      fetchAllBlogs();
    } catch (error) {
      console.log(error)

    }
  }
  console.log("like", currentUser?._id)
  return (
    <>

      <ScrollArea className="h-[1200px] w-full rounded-md " >
        <div className="p-4 ">
          <h3 className="mb-4 text-lg font-medium leading-none">All-Blogs </h3>
          {blogs != null && blogs?.map((blog: any, index: number) => (
            <>
              <Link to={'/blog/' + blog?._id} key={index}>
                <div className="max-w-md mx-auto rounded-xl shadow-md  border overflow-hidden md:max-w-4xl">
                  <div className="md:flex">
                    <div className="md:shrink-0">
                      <img className="h-48 w-full object-cover md:h-full md:w-48" src={blog?.blogImage || "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Modern building architecture" />
                    </div>
                    <div className="p-8">
                      <Badge variant="outline" >{blog?.user?.name}</Badge>
                      <div className="mt-4 uppercase tracking-wide text-sm font-semibold">{blog.title}</div>

                      <p className="mt-2 ">{blog?.description?.substring(0, 100)}</p>

                      <div>

                        <div className='flex mt-4 justify-between items-center gap-x-4'>
                          <Badge variant="outline" >{multiFormatDateString(blog.createdAt)}</Badge>
                          <Badge variant="outline" >{blog.readTime}</Badge>
                        </div>
                        <div className='flex my-2  gap-x-3'>Tags:
                          {blog.tags && blog.tags.map((tag: string[], index: number) => (
                            <Badge variant="outline" key={index}>{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-row gap-3">
                          <div className='flex gap-2' >
                            {blog.likes.some((like: any) => like._id === currentUser?._id) ? (<Heart onClick={(e) => {
                              e.stopPropagation(); // Prevent the link from being clicked
                              giveLiketoBlog(blog._id);

                            }} fill="true" />) : (<Heart onClick={(e) => {
                              // Prevent the link from being clicked
                              e.stopPropagation();
                              giveLiketoBlog(blog._id);

                            }} />)}
                            <p className="text-sm text-gray-500">{blog?.likes?.length}</p></div>
                          <div className='flex gap-2'> <Command /> <p className="text-sm text-gray-500">{blog?.comments?.length}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <br />
            </>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

export default AllBlog