const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    content: String,
    published: {
        type: Date,
        default: Date.now
    },
    username:String,
    category:String,
    title:String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('Post', Post);