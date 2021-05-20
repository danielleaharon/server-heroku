const Device = require('../models/devices');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();


const addDevicePost = async (PostId,deviceId) => {
    return await Device.findById(deviceId).then(device=>{
console.log("post add devices"+device)
        Post.findByIdAndUpdate(PostId,{
            $push: {
                devices:[device]
            }
        })
     
    })

    
};
const createDevice = async ( userId,device_name, device_image) => {
    console.log("createDevice")
    const device = new Device({
        device_name: device_name,
        device_image: device_image,

    });

    console.log(userId)
    return await device.save().then(newDevice => {
        User.findByIdAndUpdate(userId, {
            $push: {
                devices: {
                    $each: [newDevice],
                    $position: 0
                }
            }
        });
});
}


const getDevicesPost = async (id) => {    
    Post.findById(id).populate('devices').exec(function (err, docs) {
        if (err) return null;
        return docs.devices;
    });
}
const getDevicesUser = async (id) => {    
    User.findById(id).populate('devices').exec(function (err, docs) {
        if (err) return null;
        return docs.devices;
    });
}


const getDeviceById = async (id) => {

    return await Device.findById(id);
};


const updateDevice = async (id, device_name, device_image) => {
    const device = await Device.findById(id);
    if (!device)
        return null;

    device.device_name = device_name;
    device.device_image = device_image;

    await user.save();
    return user;
};

const deleteDevice = async (id) => {
    const device = await getDeviceById(id);
    if (!device)
        return null;

    device.isDelete = true;

    await device.save();
    return device;
};

module.exports = {
    createDevice,
    getDeviceById,
    updateDevice,
    deleteDevice,
    getDevicesPost,
    getDevicesUser,
    addDevicePost,
   
}