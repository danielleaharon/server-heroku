const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Calendar = new Schema({
    
    published: {
        type: Date,
        default: Date.now
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    userId:String,
    username:String,
    category:String,
    calenderEvent_id:Number,
    meeting_number:String,
    meeting_password:String,
    meeting_date:Date
});

module.exports = mongoose.model('Calendar', Calendar);