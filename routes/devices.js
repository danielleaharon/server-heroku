const express = require('express');
var router = express.Router();
const devicesController = require('../controllers/devices');


//validatores



// router.route('/')
//     .get(articleController.getArticles)
//     .post(articleController.createArticle);

router.post('/create',devicesController.createDevice);
router.post('/addToPost/:deviceId/:postId',devicesController.addDevicePost);
router.post('/update',devicesController.updateDevice);
router.get('/delete/:id',devicesController.deleteDevice);
router.get('/:userId',devicesController.getDevicesUser);
router.get('/:postId',devicesController.getDevicesPost);



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