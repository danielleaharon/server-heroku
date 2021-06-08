const User=require('../models/user');
const Calendar = require('../models/calendar');
const nodemailer = require("nodemailer");
require('dotenv').config();

const sendmail= async (userId,Id,calendarId)=>{

  let coachId = userId;
  let currectUser = Id;
  let calendar=calendarId;

  console.log("userId:"+userId);

  const coach= await User.findById(userId);
  const CurrectUser= await User.findById(Id);
const CalendarId= await Calendar.findById(calendarId);
console.log(coach)
let emailText= '<h3> hey '+coach.name +'!! <br> The trainee '+CurrectUser.name +' signed up for your ' +CalendarId.category+' training <br>on: '+CalendarId.meeting_date+'</h3>';
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fitshare7@gmail.com',
      pass: 'Dda024841975'
    }
  }); 
  var mailOptions = {
    from: 'fitshare7@gmail.com',
    to: coach.username,
    subject: 'Sign up for your workout- FITSHARE',
    text: emailText,
  html: emailText+ '<br> <img src="cid:logo"/>',
    attachments: [{
        filename: 'logomail.png',
        path:  './logomail.png',
        cid: 'logo' //same cid value as in the html img src
    }]
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.json({ status: 'success' });

      console.log('Email sent: ' + info.response);
    }
  });
}
const sendmailGet= async (req,res)=>{
console.log("sendmailGet ");
  let coachId = req.params.userId;
  let currectUser = req.params.Id;
  let calendar=req.params.calendarId;

  let coach= await User.findById(coachId);
  let CurrectUser= await User.findById(currectUser);
  let CalendarId= await Calendar.findById(calendar);
let emailText= '<h3> hey '+coach.name +'!! <br> The trainee '+CurrectUser.name +' signed up for your ' +CalendarId.category+' training <br>on: '+CalendarId.meeting_date+'</h3>';
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fitshare7@gmail.com',
      pass: 'Dda024841975'
    }
  }); 
  var mailOptions = {
    from: 'fitshare7@gmail.com',
    to: coach.username,
    subject: 'Sign up for your workout- FITSHARE',
    text: emailText,
  html: emailText+ '<br> <img src="cid:logo"/>',
    attachments: [{
        filename: 'logomail.png',
        path:  './logomail.png',
        cid: 'logo' //same cid value as in the html img src
    }]
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.json({ status: 'success' });

      console.log('Email sent: ' + info.response);
    }
  });

}
const getCalendarUser = async (req, res) => {    
  const id =req.params.userId;
  User.findById(id).populate('calendar_events').exec(function (err, docs) {
      if (err) console.error(err.stack||err);
      res.json(docs.calendar_events);

  });
}


const addCalendarUser= async (req, res) => {
  const userId=req.body.userId;
  const Id=req.body.Id;
  const calendarId=req.body.calendarId;

  console.log(userId,Id,calendarId);
  sendmail(userId,Id,calendarId);
  Calendar.findByIdAndUpdate(req.body.calendarId,{
    $push: {
      users: [req.body.Id]
    }
  }).then(calendar => {
    User.findByIdAndUpdate(req.body.Id , {
        $push: {
          calendar_events: [calendar]
        }
    }).then(() => res.json({ status: 'success', value : calendar })).catch(() => {
        res.json({ status: 'failed' });
    });
}).catch(() => {
    res.json({ status: 'failed' });
});

  
};
const createCalendarEvent = (req, res) => {

  console.log("createCalendarEvent")
    const calendar = new Calendar({
        userId:req.body.userId,
        username: req.body.username,
        category: req.body.category,
        calenderEvent_id: req.body.calenderEvent_id,
        meeting_number: req.body.meeting_number,
        meeting_password: req.body.meeting_password,
        meeting_date: req.body.meeting_date,

    });

    calendar.save().then(newEvent => {
      User.findByIdAndUpdate(req.body.userId , {
          $push: {
            calendar_events: {
                  $each: [newEvent],
                  $position: 0
              }
          }
      }).then(() => res.json({ status: 'success', value : newEvent })).catch(() => {
          res.json({ status: 'failed' });
      });
  }).catch(() => {
      res.json({ status: 'failed' });
  });
}

const updateCalendarEvent = async (req, res) => {
  Calendar.findByIdAndUpdate(req.params.calendarId, 
      {  
        category: req.body.category,
        calenderEvent_id: req.body.calenderEvent_id,
        meeting_date: req.body.meeting_date,
      
      },{ new: true }
  ).then(() => res.json({ status: 'success' })).catch((err) => {
      res.json({ status: "error: "+err});
  });
 

};  

  const deleteCalendarEvent = async (req, res) => {
 

    Calendar.findById(req.params.calendarId).exec((err,calendar)=>{
        if(err||!calendar){
             res.status(404).json({ errors: ['Event not found'] });        
        }
        else{
          calendar.remove().then((suceecs)=>{
    
                        User.findByIdAndUpdate(req.params.userId , 
                            {  $pullAll: {
                              calendar_events:  [req.params.calendarId]
                                 
                            }},{ new: true }
                        ).then(() => res.json({ status: 'success', value : calendar })).catch((err) => {
                            res.json({ status: err });
                        });
                    
            
                }  );
        
    }
});
}
const deleteCalendarEventTrainig = async (req, res) => {
 
  Calendar.findByIdAndUpdate(req.params.calendarId, {  
    $pullAll: {
    users:  [req.params.userId]
       
  }},{ new: true }).then(()=>{
                      User.findByIdAndUpdate(req.params.userId , 
                          {  $pullAll: {
                            calendar_events:  [req.params.calendarId]
                               
                          }},{ new: true }
                      ).then(() => res.json({ status: 'success', value : calendar })).catch((err) => {
                          res.json({ status: err });
                      });
                    });
          
              } 
      



  module.exports = {
    getCalendarUser,
    deleteCalendarEvent,
    updateCalendarEvent,
    createCalendarEvent,
    addCalendarUser,
    deleteCalendarEventTrainig,
    sendmail,
    sendmailGet
    
   
  };