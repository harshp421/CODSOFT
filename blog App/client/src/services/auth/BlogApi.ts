import AxiosInstance from "../middleware";

export const BlogApi = {
    createBlog: async (data: any) => {
      try{
      const response=await AxiosInstance.post("/blog/",data);
        return response;
      }catch(error)
      {
        console.log(error)
        return error?.response;
      }
    },
    ListAllBlogs: async () => {
        try{
        const response=await AxiosInstance.get("/blog/");
            return response;
        }catch(error)
        {
            console.log(error)
            return error?.response;
        }
        },
      ListAllBlogsCategory: async () => {
        try{
        const response=await AxiosInstance.get(`/blog/tags`);
            return response;
        }catch(error)
        {
            console.log(error)
            return error?.response;
        }
        },
    getBlogById: async (id: any) => {
        try{
        const response=await AxiosInstance.get(`/blog/${id}`);
            return response;
        }catch(error)
        {
            console.log(error)
            return error?.response;
        }
        },
    giveLikeToBlog:async(blogId:any)=>{
      try{
        const response=await AxiosInstance.put(`/blog/like/${blogId}`)
        return response;
      }catch(error)
      {
   
        console.log(error)
        return error?.response;
      }
    },
    searchBlog: async (query: string) => {
      try {
        const response = await AxiosInstance.get(`/blog/search?q=${query}`);
        return response;
      } catch (error) {
        console.log(error);
        return error?.response;
      }
    },

}
