const express = require('express');
const postController = require('../controllers/post')
var router = express.Router();

router.get('/userId/:userId', postController.get);
router.post('/', postController.create);
// router.post('/userId/:userId/:postId', postController.updatePost);

router.get('/', postController.getPosts);
router.get('/post/:postId', postController.getPost);

router.post('/like', postController.like);
router.post('/dislike', postController.disLike);

router.get('/postByDate', postController.getPostsByDate);
router.get('/postByDate/:more', postController.getPostsMoreDate);

router.get('/category/:category', postController.getItemsTypeCategorey);
router.get('/category/', postController.getItemTypeCountes);

router.get('/userId/:userId/:postId', postController.DeletePost);


module.exports = router;