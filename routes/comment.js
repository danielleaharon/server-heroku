const express = require('express');
const commentController = require('../controllers/comment')
var router = express.Router();

router.get('/postid/:postId', commentController.get);
router.post('/', commentController.create);
router.get('/delete/:commentId/:postId',commentController.deleteComment);

module.exports = router;