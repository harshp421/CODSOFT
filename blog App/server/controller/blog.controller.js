const Blog=require('../model/blog.model');
const asyncHandler = require('express-async-handler');
//create a blog
const createBlog = asyncHandler(async (req, res) => {
    try
    {
        console.log(req.body,"conole");
        const { title, description,category,tags,readTime,file } = req.body;
        const blog = new Blog({ title, description, blogImage:file,category,tags,readTime,user: req.user._id });
        await blog.save();
        res.status(200).json({
            status: true,
            message: "Blog Created Successfully",
            blog
        })

    }catch(error)
    {   console.log(error);
        //throw new Error(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong"
        })
    }
})
// Update a blog
const updateBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, blogImage,category } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, blogImage ,category}, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        throw new Error(error);
    }
});

// List all blogs
const listAllBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user');
        res.status(200).json({
            status: true,
            message: "Blogs retrieved successfully",
            blogs
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single blog by id
const getBlogById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('user');
        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "Blog retrieved successfully",
            blog
        });
    } catch (error) {
        throw new Error(error);
    }
});
// Give a like to a blog
const giveLikeToBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }
        
        const userId = req.user._id;

        // Check if the user's ObjectId already exists in the likes array
        const alreadyLiked = blog.likes.some(like => like._id.toString() === userId.toString());

        if (!alreadyLiked) {
            // User has not liked the blog, add user id to likes array
            blog.likes.push({ _id: userId });
        } else {
            // User has already liked the blog, remove user id from likes array
            blog.likes = blog.likes.filter(like => like._id.toString() !== userId.toString());
        }
        
        await blog.save();
        
        res.status(200).json({
            status: true,
            message: "Like updated for blog",
            blog
        });
    } catch (error) {
        // Handle errors properly
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
});




// Add a comment to a blog
const addCommentToBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }
        blog.comments.push(comment);
        await blog.save();
        res.status(200).json({
            status: true,
            message: "Comment added to blog",
            blog
        });
    } catch (error) {
        throw new Error(error);
    }
});

const searchBlogs = async (req, res) => {
    try {
        // Extract the search q from the request query
        const { q } = req.query;
        
        // Perform the search query based on title and tags
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: q, $options: 'i' } }, // Case-insensitive title search
                { tags: { $in: [q] } } // Search for exact match in tags array
            ]
        });

        // Send the search results as a response
        res.status(200).json({
            status: true,
            message: "Blogs found",
            blogs
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};


const getAllUniqueTags = async (req, res) => {
    try {
        const uniqueTags = await Blog.aggregate([
            // Unwind the tags array to create a new document for each tag
            { $unwind: "$tags" },
            // Group by tags and count the number of occurrences
            { $group: { _id: "$tags", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            status: true,
            message: "Unique tags retrieved successfully",
            uniqueTags
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    listAllBlogs,
    giveLikeToBlog,
    addCommentToBlog,
    searchBlogs,
    getBlogById,
    getAllUniqueTags
};



