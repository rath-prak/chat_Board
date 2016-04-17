var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000, function(){
	console.log('Listening to port 3000...')
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//load up index.html file by creating a route
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});