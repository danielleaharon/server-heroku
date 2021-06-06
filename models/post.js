const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    
    published: {
        type: Date,
        default: Date.now
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
      }
    ],
    devices: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Devices"
        }
      ],
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category:String,
    likes:Number,
    video:String,
});

module.exports = mongoose.model('Post', Post);