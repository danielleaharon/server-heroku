const raccoon = require('raccoon');
  // raccoon = require("@maruware/raccoon");
const Post = require('../models/post');
raccoon.config.localSetup = false;

const getUserRecommendations = async (req, res) => {  
  const userId = req.params.userId;

const postsIds = await raccoon.recommendFor(userId, 2)
      .then((_) => {
        console.log('recommendation For user: ' + _);
        return _;
      });

  console.log(postsIds);

  const posts = await Promise.all(
    postsIds.map((postId) =>  Post.findById(postId).populate('userId'))
  );

  return res.json(posts);
};


const postsMostLiked = async (req, res) => {
  // const userId = req.user._id;

  const mostLiked = await raccoon.mostLiked().then((_) => {
      console.log(raccoon.config)
    console.log('most Liked: ' +_);
    return _;
  });

  console.log('before mapping: ' + mostLiked);
  
  let posts = await Promise.all(
    mostLiked.map((postId) =>  Post.findById(postId))
  );

  return res.json({
    status: 203,
    message: posts,
  });
};

const postsLikedByUserId = async (req, res) => {
  const userId = req.body.userId;
  const allPostsLiked =  await raccoon.allLikedFor(userId);
  console.log(allPostsLiked);
  
  const posts = await Promise.all(
    allPostsLiked.map((postId) => Post.findById(postId))
  );
  
  return res.json(posts);
};


module.exports = {
  getUserRecommendations,
  postsMostLiked,
  postsLikedByUserId,
};
