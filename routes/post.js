const express = require('express');
const postController = require('../controllers/post')
var router = express.Router();

router.get('/:userId', postController.get);
router.post('/', postController.create);
router.post('/:userId/:postId', postController.updatePost);

router.get('/', postController.getPosts);


router.get('/Category', postController.getItemTypeCountes);

router.post('/:userId/:postId', postController.DeletePost);


module.exports = router;