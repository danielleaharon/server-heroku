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
        username:req.body.username,
        userId:req.body.userId,
        category:req.body.category,
        likes:req.body.likes,
        isDelete:req.body.isDelete,
        video:req.body.video,
        devices:req.body.devices,


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
// const deletePost = async (req, res) => {
 
//         Post.findById(req.params.rpostId).exec((err,post)=>{
//             if(err||!post){
//                  res.status(404).json({ errors: ['Post not found'] });        
//             }
//             else{
//                    post.remove().then((suceecs)=>{
        
//                             User.findByIdAndUpdate(req.params.userId , 
//                                 {  $pullAll: {
//                                     posts:  [req.params.postId]
                                     
//                                 }},{ new: true }
//                             ).then(() => res.json({ status: 'success', value : post })).catch((err) => {
//                                 res.json({ status: err });
//                             });
                        
                
//                     }  );
            
//         }
//     });
// }

const updatePost = async (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, 
        {  
            category:req.body.category,
            likes:req.body.likes,
        
        },{ new: true }
    ).then(() => res.json({ status: 'success' })).catch((err) => {
        res.json({ status: "error: "+err});
    });
   
  
};     
const DeletePost = async (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, 
        {  
            isDelete:true,
        
        },{ new: true }
    ).then(() => res.json({ status: 'success' })).catch((err) => {
        res.json({ status: "error: "+err});
    });
   
  
};           
  

module.exports = { create, get ,getPosts,updatePost,getItemTypeCountes,DeletePost};