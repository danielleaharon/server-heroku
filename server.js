var express = require('express');
var port = process.env.PORT ;
var app = express();

app.get('/', function (req, res) {
    res.send(JSON.stringify({ identity: 'Mockpffffress'}));
});

console.log(process.env.PORT)

app.listen(port, function () {
    console.log('Mockpress is fffffflistning...'+port);
});