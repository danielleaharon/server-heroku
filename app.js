// var express = require('express');
// var port = process.env.PORT || 3000;
// var app = express();

// app.get('/', function (req, res) {
//     res.send(JSON.stringify({ identity: 'auto'}));
// });

// console.log(process.env.PORT)

// app.listen(port, function () {
//     console.log('Mockpress is listning...'+port);
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const post = require('./routes/post');
const user = require('./routes/user');
const search = require('./routes/search');
const comment = require('./routes/comment');
const recommendations = require('./routes/recommendations');
const devices = require('./routes/devices');
const calendar = require('./routes/calendar');
const raccoon = require('raccoon');

const cors = require('cors'); 

require('dotenv').config();
raccoon.config.host=process.env.POSTGRES_HOST;
raccoon.config.redisPort=process.env.RACCOON_REDIS_PORT;
raccoon.config.redisUrl=process.env.RACCOON_REDIS_URL;

console.log(raccoon.config)
mongoose.set('useCreateIndex', true);
try {
mongoose.connect( process.env.MOMGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>{
console.log("connected")});    
}catch (error) { 
console.log("could not connect");    
}

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use('/posts', post);
app.use('/user', user);
app.use('/comment', comment);
app.use('/devices', devices);
app.use('/calendar', calendar);
app.use('/search', search);
app.use('/recommendations', recommendations);



const port= process.env.PORT;
app.listen(port,()=>{
    console.log(port)
});