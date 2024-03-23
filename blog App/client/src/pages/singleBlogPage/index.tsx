import { Badge } from '@/components/ui/badge'
import useGetCurrentUser from '@/hooks/useGetCurrentUser'
import { formatDateString, multiFormatDateString } from '@/lib/utils'
import { BlogApi } from '@/services/auth/BlogApi'
import { Command, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
 
interface Blog {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        password: string;
        isBlocked: boolean;
        savedBlogs: any[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    title: string;
    description: string;
    blogImage: string;
    readTime: string;
    category: string;
    tags: any[];
    date: string;
    comments: any[];
    likes: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}


const SingleBlogPage = () => {
    const [blogDetails, setBlogDetails] = useState<Blog | null>(null)
    const params=useParams();
    const currentUser = useGetCurrentUser();

    const getSingleBlog = async (id) => {
        try {
            const response = await BlogApi.getBlogById(id);
            setBlogDetails(response.data.blog);
           console.log(response,"single blog")
        } catch (error) {
            console.log(error);
        }
    
    }
    useEffect(() => {
          
       getSingleBlog(params.id);
    }, [])

    const giveLiketoBlog = async (blogId: any) => {
        try {
          const response = await BlogApi.giveLikeToBlog(blogId);
          //console.log(response, "responce")
          getSingleBlog(params.id);
        } catch (error) {
          console.log(error)
    
        }
      }
    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <div>
                    <img src={blogDetails?.blogImage || "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={blogDetails?.title} className='w-full h-[500px] object-contain' />
                </div>

                <div className='mt-10 max-w-5xl mx-auto '>
                    <div className='flex justify-between items-center gap-x-4'>
                        <Badge variant="outline" >{multiFormatDateString(blogDetails?.createdAt)}</Badge>
                        <Badge variant="outline" >{blogDetails?.readTime}</Badge>
                    </div>
                    <h1 className='text-5xl font-bold mt-8'>{blogDetails?.title}</h1>
                    <div className="blog_content mt-2 pt-3 leading-6 whitespace-pre-line">
                        <p >{blogDetails?.description}</p>
                    </div>
                    <div className='flex my-10 gap-x-3'>Tags:
                        {blogDetails?.tags.map((tag) => (
                          <Badge variant="outline">{tag}</Badge>

                        ))}
                      </div>
                      <div className="flex flex-row gap-3">
                        <div className='flex gap-2'>  {blogDetails?.likes.some((like: any) => like._id === currentUser._id) ? (<Heart onClick={(e) => {
                              e.stopPropagation(); // Prevent the link from being clicked
                              giveLiketoBlog(blogDetails?._id);

                            }} fill="true" />) : (<Heart onClick={(e) => {
                             // Prevent the link from being clicked
                             e.stopPropagation();
                             giveLiketoBlog(blogDetails?._id);

                            }} />)} <p className="text-sm text-gray-500">{blogDetails?.likes.length}</p></div>
                        <div className='flex gap-2'> <Command /> <p className="text-sm text-gray-500">{blogDetails?.comments.length}</p></div>
                      </div>

                </div>
            </div>
        </>
    )
}

export default SingleBlogPage