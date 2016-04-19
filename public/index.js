
		$(document).ready(function(){
			var socket = io.connect(); //grabbing the socket functionality from socket
			var messageForm = $('#messageForm');
			var message = $('#message');
			var chat = $('#chatWindow');

			var usernameForm = $('#usernameForm'); // adding new users
			var users = $('#users'); // array of users
			var username = $('#username');
			var error = $('#error');

			var timeInMs = Date.now();

			//add event handler
			usernameForm.submit(function(e){
				e.preventDefault();
				socket.emit('new user', username.val(), function(data){ // look at param for socket.emit
					if(data){
						$('#namesWrapper').hide();
						$('#mainWrapper').show();
					}else{
						error.html('please choose new nickname');
					}
				});
				username.val('');
			});

			socket.on('nickname', function(data){ // this is adding new users to the screen?
				var html = '';
				for(i = 0; i < data.length; i++){
					html += data[i] + '<br>';
				}
				users.html(html);
			});


			messageForm.submit(function(e){ //bind an event handler to the messageForm
				e.preventDefault(); //prevent default because we dont want the form to summit and refresh
				socket.emit('send message', message.val()); //send message to the server
				message.val(''); //after the message has been sent, the window is cleared

			});

			socket.on('new message', function(data){
				chat.append(timeInMs + '<br>' + '<strong>' + data.user + '</strong>: ' + data.msg + '<br>'); 
			});




	});

	
