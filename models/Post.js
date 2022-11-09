const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    buyeremail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    }
},
    { timestamps: true }
);
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;  