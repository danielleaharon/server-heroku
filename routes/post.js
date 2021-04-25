const express = require('express');
const postController = require('../controllers/post')
var router = express.Router();

router.get('/:userId', postController.get);
router.post('/', postController.create);
router.post('/:userId/:postId', postController.updatePost);

router.get('/', postController.getPosts);

router.post('/like', postController.like);
router.post('/dislike', postController.disLike);


router.get('/Category', postController.getItemTypeCountes);

router.get('/:userId/:postId', postController.DeletePost);


module.exports = router;