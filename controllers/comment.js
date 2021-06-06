const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

const create = async (req, res) => {
    const post = await Post.findById(req.body.postId);
    const user = await User.findById(req.body.userId);

    const comment = new Comment({
        userName:user.name,
        userImage:user.image,
        content: req.body.content,
        userId: user,
        postId: post
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
    const id = req.params.postId;

    Post.findById(id).populate('comments').exec(function (err, docs) {
        if (err) console.error(err.stack || err);
        console.log( docs.comments);
        docs.comments.sort((a,b)=>b.published-a.published);
        res.json(docs.comments);
    });
}

  
const deleteComment =  (req, res) => {
    const id = req.params.postId;
    Post.findByIdAndUpdate(id,
        {
          $pullAll: {
            comments: [req.params.commentId]
    
          }
        }, { new: true }
      ).then(() => res.json({ status: 'success', value: device })).catch((err) => {
        res.json({ status: err });
      });
}

module.exports = { create, get,deleteComment};