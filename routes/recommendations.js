const express = require('express');
const recommendationController = require('../controllers/recommendations');
var router = express.Router();

router.get('/userId/:userId', recommendationController.getUserRecommendations);        //RecommendationFor - getting posts recommendation for user logged in.

// router.get('/allLikedByUser', recommendationController.postsLikedByUserId);   
router.get('/mostLiked', recommendationController.postsMostLiked);          

module.exports = router;
