const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

const create = async (req, res) => {
    const post = await Post.findById(req.body.post);
    const user = await User.findOne({ username: req.body.username });

    const comment = new Comment({
        content: req.body.content,
        username: user,
        post: post
    });

    comment.save().then((newComment) => {        
        post.comments.push(newComment);
        post.save();
        res.json({ status: 'success' });        
    }).catch((e) => {
        res.json({ status: 'failed' });
    });
}

const get = async (req, res) => {
    Post.findById(req.params.postId).populate({path:'comments',populate: { path: 'username' }}).exec(function (err, docs) {
        if (err) console.error(err.stack || err);
        res.json(docs.comments);
    });
}

module.exports = { create, get };