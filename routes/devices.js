const express = require('express');
var router = express.Router();
const devicesController = require('../controllers/devices');


//validatores



// router.route('/')
//     .get(articleController.getArticles)
//     .post(articleController.createArticle);

router.post('/create',devicesController.createDevice);
router.post('/addToPost',devicesController.addDevicePost);
router.post('/update/:deviceId',devicesController.updateDevice);
router.get('/delete/:deviceId/:userId',devicesController.deleteDevice);
router.get('/user/:userId',devicesController.getDevicesUser);
router.get('/post/:postId',devicesController.getDevicesPost);
router.get('/all',devicesController.getAllDevice);



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