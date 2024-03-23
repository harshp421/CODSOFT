const express = require('express');
const { createBlog, listAllBlogs, updateBlog, deleteBlog, giveLikeToBlog, addCommentToBlog, getBlogById, getAllUniqueTags, searchBlogs } = require('../../controller/blog.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const  blogRoute = express.Router();

//creat
blogRoute.post('/',authMiddleware,createBlog);
//read
blogRoute.get('/search', searchBlogs);
blogRoute.get('/',listAllBlogs);
blogRoute.get('/tags',getAllUniqueTags);
//update
blogRoute.get('/:id',authMiddleware,getBlogById  );
blogRoute.put('/like/:id',authMiddleware,giveLikeToBlog);
blogRoute.patch('/comment/:id',authMiddleware,addCommentToBlog);
//delete
blogRoute.delete('/:id',authMiddleware,deleteBlog);
module.exports=blogRoute;