const express = require('express');
var router = express.Router();
const userController = require('../controllers/user');


//validatores



// router.route('/')
//     .get(articleController.getArticles)
//     .post(articleController.createArticle);

router.post('/test',userController.createUsertest);
router.get('/:userId',userController.getUser);

router.post('/signup',userController.createUser);
router.post('/signin',userController.Signin);
router.post('/signout',userController.Signout);
router.post('/update/:userId',userController.updateUser);
router.post('/update/imageUrl/:userId',userController.updateImage);


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