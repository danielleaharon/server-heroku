const deviceService = require('../services/devices');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const User=require('../models/user');
const Device = require('../models/devices');
const Post = require('../models/post');

require('dotenv').config();



const getDevicesPost = async (req, res) => {   
  const id =req.params.postId;
   
    Post.findById(id).populate('devices').exec(function (err, docs) {
        if (err) console.error(err.stack||err);
        res.json(docs.devices);

    });


}
const getDevicesUser = async (req, res) => {    
  const id =req.params.userId;
  User.findById(id).populate('devices').exec(function (err, docs) {
      if (err) console.error(err.stack||err);
      res.json(docs.devices);

  });
}
// const getDevicesUser = async (req, res) => {    
//   const id =req.params.userId;
//   return await deviceService.getDevicesUser().then(respond=>{
//     if(respond!=null){
//       res.json({
//         message: "error"
//       });

//     }
//     else{
//       res.json(respond);

//     }

//   });

// }

const addDevicePost= async (req, res) => {


  Device.findById(req.body.deviceId).then(devices => {
    Post.findByIdAndUpdate(req.body.postId , {
        $push: {
          devices: {
                $each: [devices],
                $position: 0
            }
        }
    }).then(() => res.json({ status: 'success', value : devices })).catch(() => {
        res.json({ status: 'failed' });
    });
}).catch(() => {
    res.json({ status: 'failed' });
});
    // return await deviceService.addDevicePost(req.body.postId,req.body.deviceId).then((newDevice)=>{
    //     if(newDevice!=null)
    //     {
    //         res.json({
    //             status:200 
    //         })
    //     }
    //     else{
    //       res.json({
    //         status:400 
    //     })        }
    // });
  
};
const createDevice = (req, res) => {

  console.log("createDevice")
    const device = new Device({
        userId:req.body.userId,
        device_name: req.body.device_name,
        device_image: req.body.device_image,

    });

    device.save().then(newPost => {
      User.findByIdAndUpdate(req.body.userId , {
          $push: {
              devices: {
                  $each: [newPost],
                  $position: 0
              }
          }
      }).then(() => res.json({ status: 'success', value : newPost })).catch(() => {
          res.json({ status: 'failed' });
      });
  }).catch(() => {
      res.json({ status: 'failed' });
  });
}
// const createDevice= async (req, res) => {
//       return await deviceService.createDevice(req.body.userId,req.body.device_name,req.body.device_image).then((newDevice)=>{
//         if(newDevice!=null)
//         {
//             res.json({
//                 status:200 
//             })
//         }
//         else{
//           res.json({
//             status:400 
//         })        }
//     });
  
// };

const updateDevice= async (req, res) => {
  id, device_name, device_image
    const device = await deviceService.updateDevice(req.body.deviceId,req.body.device_name,req.body.device_image);
    if (!device) {
      return  res.json({ 
        status:400,
        message:' device not found' });
    }
  
    res.json({
      status:200,
      device
    });
  };

  const deleteDevice= async (req, res) => {
    const device = await deviceService.deleteDevice(req.params.id);
    if (!device) {
      return  res.json({ 
        status:400,
        message:' device not found' });    }
  
        res.json({
          status:200,
        });
  };



  module.exports = {
    getDevicesPost,
    getDevicesUser,
    createDevice,
    updateDevice,
    deleteDevice,
    addDevicePost
   
  };