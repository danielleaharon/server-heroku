var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.get('/', function (req, res) {
    res.send(JSON.stringify({ identity: 'auto'}));
});

console.log(process.env.PORT)

app.listen(port, function () {
    console.log('Mockpress is listning...'+port);
});