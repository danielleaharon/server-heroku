const Post = require('../models/post');
const User = require('../models/user');
const PostService = require('../services/post');

const getItemTypeCountes =  async (req, res) => {
    const results = await Post.aggregate([
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
        },
      },
    ]);
  
    res.status(200).json({
      status: 'success',
      data: {
        results,
      },
    });
}

const create = (req, res) => {

    const post = new Post({
        content: req.body.content,
        username:req.body.username,
        category:req.body.category,
        title:req.body.title
    });

    post.save().then(newPost => {
        User.findOneAndUpdate({ username: req.body.username }, {
            $push: {
                posts: {
                    $each: [newPost],
                    $position: 0
                }
            }
        }).then(() => res.json({ status: 'success', value : newPost })).catch(() => {
            res.json({ status: 'failed' });
        });
    }).catch(() => {
        res.json({ status: 'failed' });
    });
}
const createPostScrape= async (req,res)=>{
    const newPost = await PostService.createPostScrape(req.body.title,req.body.username,req.body.category,req.body.content);
    res.json(newPost);
}
const get = async (req, res) => {    
    const id =req.params.userId;
    User.findById(id).populate('posts').exec(function (err, docs) {
        if (err) console.error(err.stack||err);
        res.json(docs.posts);
    });
}
const getPosts = async (req, res) => {
    Post.find({}).exec((err,docs)=>{
        if (err) console.error(err.stack||err);
        res.json(docs);
    });
   
  
};

const deletePost = async (req, res) => {
 
        Post.findById(req.params.postId).exec((err,post)=>{
            if(err||!post){
                 res.status(404).json({ errors: ['Post not found'] });        
            }
            else{
                   post.remove().then((suceecs)=>{
        
                            User.findByIdAndUpdate(req.params.userId , 
                                {  $pullAll: {
                                    posts:  [req.params.postId]
                                     
                                }},{ new: true }
                            ).then(() => res.json({ status: 'success', value : post })).catch((err) => {
                                res.json({ status: err });
                            });
                        
                
                    }  );
            
        }
    });
}

const updatePost = async (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, 
        {  
            title: req.body.title,
            category:req.body.category,
            content:req.body.content

             
        },{ new: true }
    ).then(() => res.json({ status: 'success' })).catch((err) => {
        res.json({ status: "error: "+err});
    });
   
  
};          
  

module.exports = { create, get ,getPosts,deletePost,updatePost,createPostScrape,getItemTypeCountes};