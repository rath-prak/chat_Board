var express = require('express');
var app = express();
var server = require('http').createServer(app); // this is required with socket
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
	res.sendFile(__dirname + '/views/index.html'); // send file to client
});

// connect to socket
// var usernames = [];


io.sockets.on('connection', function(socket){  //this is the first thing that fired when client connects to socket.io, all the code goes inside here
	// socket.on('new user', function(data, callback){
	// 	if(usernames.indexOf(data) != -1){
	// 		callback(false);
	// 	}else{

	// 		callback(true);
	// 		socket.username = data;
	// 		usernames.push(socket.username); //add new user to array
	// 		updateUsernames();
	// 	}
	// });

	// update usernames
	// function updateUsernames(){
	// 	io.sockets.emit('usernames', usernames);
	// }

	//send message
	socket.on('send message', function(data){ //'send message' same name we used on the client side, then use the data and do something with it 
		io.sockets.emit('new message', data); // 'new message', same as on client side
	}); 

	//disconnect
	// socket.on('disconnect', function(data){
	// 	if(!socket.username) return; 
	// 	usernames.splice(usernames.indexOf(socket.username), 1);
	// 	updateUsernames();
	// });
})


