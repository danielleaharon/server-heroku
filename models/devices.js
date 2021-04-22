const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Devices = new Schema({
    published: {
        type: Date,
        default: Date.now
    },
    userId:String,
    device_name:String,
    isDelete:Boolean,
    device_image:String,
   
});

module.exports = mongoose.model('Devices', Devices);