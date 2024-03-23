const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    user: {
        type:  Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    category:{
        type: String,
        
    },
    tags: {
        type: [String],
        required: true
    },
    blogImage: {
      type: String,
    },
    readTime:{
        type: String,
        
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
},{timestamps:true});

module.exports  = mongoose.model('blog', BlogSchema);