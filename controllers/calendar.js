const User=require('../models/user');
const Calendar = require('../models/calendar');

require('dotenv').config();


const getCalendarUser = async (req, res) => {    
  const id =req.params.userId;
  User.findById(id).populate('calendar_events').exec(function (err, docs) {
      if (err) console.error(err.stack||err);
      res.json(docs.calendar_events);

  });
}


const addCalendarUser= async (req, res) => {


  Calendar.findById(req.body.calendarId).then(calendar => {
    User.findByIdAndUpdate(req.body.userId , {
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
 
  
                      User.findByIdAndUpdate(req.params.userId , 
                          {  $pullAll: {
                            calendar_events:  [req.params.calendarId]
                               
                          }},{ new: true }
                      ).then(() => res.json({ status: 'success', value : calendar })).catch((err) => {
                          res.json({ status: err });
                      });
                  
          
              } 
      



  module.exports = {
    getCalendarUser,
    deleteCalendarEvent,
    updateCalendarEvent,
    createCalendarEvent,
    addCalendarUser,
    deleteCalendarEventTrainig
    
   
  };