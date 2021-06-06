const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: String,
    userName: String,
    published: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

module.exports = mongoose.model('Comment', Comment);