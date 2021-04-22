const deviceService = require('../services/devices');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const User=require('../models/user');
require('dotenv').config();



const getDevicesPost = async (req, res) => {    
  const id =req.params.postId;
  return await deviceService.getDevicesPost().then(respond=>{
    if(respond!=null){
      res.json({
        message: "error"
      });

    }
    else{
      res.json(respond);

    }

  });

}
const getDevicesUser = async (req, res) => {    
  const id =req.params.userId;
  return await deviceService.getDevicesUser().then(respond=>{
    if(respond!=null){
      res.json({
        message: "error"
      });

    }
    else{
      res.json(respond);

    }

  });

}

const addDevicePost= async (req, res) => {

    return await deviceService.addDevicePost(req.params.postId,req.params.deviceId).then((newDevice)=>{
        if(newDevice!=null)
        {
            res.json({
                status:200 
            })
        }
        else{
          res.json({
            status:400 
        })        }
    });
  
};
const createDevice= async (req, res) => {
      return await deviceService.createDevice(req.body.userId,req.body.device_name,req.body.device_image).then((newDevice)=>{
        if(newDevice!=null)
        {
            res.json({
                status:200 
            })
        }
        else{
          res.json({
            status:400 
        })        }
    });
  
};

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