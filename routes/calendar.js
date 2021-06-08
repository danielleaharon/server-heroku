const express = require('express');
var router = express.Router();
const calendarController = require('../controllers/calendar');



router.post('/create',calendarController.createCalendarEvent);
router.post('/addToUser',calendarController.addCalendarUser);
router.post('/update/:calendarId',calendarController.updateCalendarEvent);
router.get('/delete/:calendarId/:userId',calendarController.deleteCalendarEvent);
router.get('/:userId',calendarController.getCalendarUser);
router.get('/deleteTraining/:calendarId/:userId',calendarController.deleteCalendarEventTrainig);
router.post('/sendEmail/',calendarController.sendmail);
router.get('/sendEmail/:userId/:Id/:calendarId',calendarController.sendmailGet);


module.exports = router;