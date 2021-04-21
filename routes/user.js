const express = require('express');
var router = express.Router();
const userController = require('../controllers/user');


//validatores
const{runValidation}=require('../validators');
const{userSignupValidator,userSigninValidator}=require('../validators/user');


// router.route('/')
//     .get(articleController.getArticles)
//     .post(articleController.createArticle);

router.post('/test',userController.createUsertest);

router.post('/signup',userController.createUser);
router.post('/signin',userSigninValidator,runValidation,userController.Signin);
router.post('/signout',userController.Signout);


// router.get('/secret',userController.requireSignin,(req,res)=>{
//     res.json({
//         message: 'you have access to secreat page'
//     });
// });


// router.route('/:id')
//     .get(articleController.getArticle)
//     .patch(articleController.updateArticle)
//     .delete(articleController.deleteArticle);

module.exports = router;