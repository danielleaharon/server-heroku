const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    
    published: {
        type: Date,
        default: Date.now
    },
    devices: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Devices"
        }
      ],
    userId:String,
    username:String,
    category:String,
    title:String,
    likes:Number,
    isDelete:Boolean,
    video:String,
});

module.exports = mongoose.model('Post', Post);