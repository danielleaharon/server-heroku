const Post = require('../models/post');
const User = require('../models/user');
const PostService = require('../services/post');

const getItemTypeCountes =  async (req, res) => {
    console.log("getItemTypeCountes")

    const results = await Post.aggregate([
    //   {
    //     $unwind: { 
    //         path: "$category",
    //  }
    // },
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
          posts: { $push: '$$ROOT' }
        },
      },
    ]);
  
    console.log(results)
    res.json({results
    });
 
}
const getPostsMoreDate =  async (req, res) => {
    console.log("getPostsByDate")
    console.log(req.params.more)
    const d = new Date()
    var myCurrentDate=new Date();
    myCurrentDate.setDate(myCurrentDate.getDate()-req.params.more*2);
    console.log(myCurrentDate)

    var myPastDate=new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 2);//2 day's befor
        
    const result=  await Post.find({ "published" : { $gt: myPastDate, $lt: myCurrentDate} } ).populate('userId');;    // value1 < field < value
    result.sort((a,b)=>b.published-a.published);

   
    res.json(result);

//  console.log(result)
 
}
const getPostsByDate =  async (req, res) => {
    console.log("getPostsByDate")

    var myCurrentDate=new Date();
    var myPastDate=new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 2);//2 day's befor
    const result=  await Post.find({ "published" : { $gt: myPastDate } } ).populate('userId');    // value1 < field < value
result.sort((a,b)=>b.published-a.published);
 
    res.json(result);

//  console.log(result)
 
}
const create = (req, res) => {

    const post = new Post({
        userId:req.body.userId,
        category:req.body.category,
        likes:req.body.likes,
        video:req.body.video,
        devices:req.body.devices,


    });

    post.save().then(newPost => {
        User.findByIdAndUpdate(req.body.userId , {
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
const like = (req, res) => {
    console.log("like:"+req.body.postId)

    Post.findByIdAndUpdate(req.body.postId,{
        $inc:{likes:1}

    }).then(post=>{
        console.log("like:"+{post})
        User.findByIdAndUpdate(req.body.userId , {
            $push: {
                posts: {
                    $each: [post],
                    $position: 0
                }
            }
        }).then(() => 
        res.json({ status: 'success', value : post })).catch(() => {
            res.json({ status: 'failed' });
        });
    }).catch(() => {
        res.json({ status: 'failed' });
    });
    
        
}

const get = async (req, res) => {  
    console.log("getPostByUser")

    const id =req.params.userId;
    var username;
  User.findById(id).populate('posts').exec(function (err, docs) {
        if (err) console.error(err.stack||err);
        const post=docs.posts;
        console.log(post)
        if(post[0]!=null){
            console.log("in")
            User.findById(post[0].userId).then(user=>{
                username =user.name
                res.json([docs.posts,username,user.image]);
       
               });
        }else{
            console.log("out")

            res.json([docs.posts]);

        }
     
        

    });

}
const disLike = (req, res) => {
    console.log("disLike:")

    Post.findByIdAndUpdate(req.body.postId,{
        $inc:{likes:-1}

    }).then(post=>{
        console.log("disLike:"+{post})
        User.findByIdAndUpdate(req.body.userId , {
            $pullAll: {
                posts:  [req.body.postId]

            }
        }).then(() => 
        res.json({ status: 'success', value : post })).catch(() => {
            res.json({ status: 'failed' });
        });
    }).catch(() => {
        res.json({ status: 'failed' });
    });
    
        
}

const getPosts = async (req, res) => {
    console.log("getPosts")

    Post.find({}).exec((err,docs)=>{
        if (err) console.error(err.stack||err);
        res.json(docs);
    });
   
  
};
const DeletePost = async (req, res) => {
 

        Post.findById(req.params.postId).exec((err,post)=>{
            if(err||!post){
                 res.status(404).json({ errors: ['Post not found'] });        
            }
            else{
                   post.remove().then((suceecs)=>{
        
                            User.findOneAndDelete(req.params.postId , 
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
            category:req.body.category,
            likes:req.body.likes,
        
        },{ new: true }
    ).then(() => res.json({ status: 'success' })).catch((err) => {
        res.json({ status: "error: "+err});
    });
   
  
};     
// const DeletePost = async (req, res) => {
//     Post.findByIdAndUpdate(req.params.postId, 
//         {  
//             isDelete:true,
        
//         },{ new: true }
//     ).then(() => res.json({ status: 'success' })).catch((err) => {
//         res.json({ status: "error: "+err});
//     });
   
  
// };           
  

module.exports = { create, get ,getPosts,updatePost,getItemTypeCountes,DeletePost,like,disLike,getPostsMoreDate,getPostsByDate};