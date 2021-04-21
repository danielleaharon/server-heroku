const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: String,
    published: {
        type: Date,
        default: Date.now
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

module.exports = mongoose.model('Comment', Comment);