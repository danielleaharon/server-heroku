const deviceService = require('../services/devices');
const User = require('../models/user');
const Device = require('../models/devices');
const Post = require('../models/post');

require('dotenv').config();



const getDevicesPost = async (req, res) => {
  const id = req.params.postId;

  Post.findById(id).populate('devices').exec(function (err, docs) {
    if (err) console.error(err.stack || err);
    res.json(docs.devices);

  });


}
const getDevicesUser = async (req, res) => {
  const id = req.params.userId;
  User.findById(id).populate('devices').exec(function (err, docs) {
    if (err) console.error(err.stack || err);
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

const addDevicePost = async (req, res) => {

console.log("addDevicePost");

  Device.findById(req.body.deviceId).then(devices => {

      User.findByIdAndUpdate(req.body.userId , {
          $push: {
              devices: {
                  $each: [devices],
                  $position: 0
              }
          }
      }).then(()=> console.log("addDeviceUser "+ req.body.userId ));
    Post.findByIdAndUpdate(req.body.postId, {
      $push: {
        devices: {
          $each: [devices],
          $position: 0
        }
      }
    }).then(() => res.json({ status: 'success', value: devices })).catch(() => {
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

// const createDevice = (req, res) => {

//   console.log("createDevice")
//     const device = new Device({
//         userId:req.body.userId,
//         device_name: req.body.device_name,
//         device_image: req.body.device_image,

//     });

//     device.save().then(newPost => {
//       User.findByIdAndUpdate(req.body.userId , {
//           $push: {
//               devices: {
//                   $each: [newPost],
//                   $position: 0
//               }
//           }
//       }).then(() => res.json({ status: 'success', value : newPost })).catch(() => {
//           res.json({ status: 'failed' });
//       });
//   }).catch(() => {
//       res.json({ status: 'failed' });
//   });
// }




const createDevice = (req, res) => {

  console.log("createDevice")
  const device = new Device({
    device_name: req.body.device_name,
    device_image: req.body.device_image,

  });

  device.save().then(newDevice => {
    res.json({ status: 'success', value: newDevice })
  }).catch(() => {
    res.json({ status: 'failed' });
  });
}

const updateDevice = async (req, res) => {
  Device.findByIdAndUpdate(req.params.deviceId,
    {
      device_name: req.body.device_name,
      device_image: req.body.device_image,

    }, { new: true }
  ).then(() => res.json({ status: 'success' })).catch((err) => {
    res.json({ status: "error: " + err });
  });


};

const deleteDevice = async (req, res) => {

  User.findByIdAndUpdate(req.params.userId,
    {
      $pullAll: {
        devices: [req.params.deviceId]

      }
    }, { new: true }
  ).then(() => res.json({ status: 'success', value: device })).catch((err) => {
    res.json({ status: err });
  });




}

const getAllDevice = async (req, res) => {

  Device.find({}).exec((err,docs)=>{
    if (err) console.error(err.stack||err);
    res.json(docs);
});

}
// const deleteDevice= async (req, res) => {
//   const device = await deviceService.deleteDevice(req.params.id);
//   if (!device) {
//     return  res.json({ 
//       status:400,
//       message:' device not found' });    }

//       res.json({
//         status:200,
//       });
// };



module.exports = {
  getDevicesPost,
  getDevicesUser,
  createDevice,
  updateDevice,
  deleteDevice,
  addDevicePost,
  getAllDevice

};