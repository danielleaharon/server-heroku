const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Devices = new Schema({
    published: {
        type: Date,
        default: Date.now
    },
    device_name : {
        type: String,
        required: true,
        trim:true,
        max:32,
    lowecase:true
    }, 
    device_image:String,
   
});

module.exports = mongoose.model('Devices', Devices);