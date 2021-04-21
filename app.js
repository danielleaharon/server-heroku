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
const comments = require('./routes/comment');
const cors = require('cors'); 
// const socketIo = require('socket.io');
// const http = require('http');

// const socketIo = require('socket.io');



require('dotenv').config();

// require('custom-env').env(process.env.NODE_ENV, './config');

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
app.use('/comments', comments);

// const server = http.createServer(app);

// const io = socketIo(server, {
//     cors: {
//         origins: ["http://localhost:4200", "http://localhost:3000"],
//         methods: ["GET", "POST"],
//         credentials: false
//     }
// });

// var count = 0;
// io.on('connection', (socket) => {        
//     // if (socket.handshake.headers.origin === "http://localhost:3000") {
//         count++;        
//         socket.broadcast.emit('count', count);               

//         socket.on('disconnect', () => {
//             count--;                   
//             socket.broadcast.emit('count', count);            
//         });
//     // }   
// }); 

const port= process.env.PORT;
app.listen(port,()=>{
    console.log(port)
});