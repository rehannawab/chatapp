// Server
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use('/static', express.static('static'));

var url = 'mongodb://localhost:27017/chatapp';
mongoose.connect(url);

require('./models/Room');

var rooms = require('./routes/rooms');

app.use('/rooms', rooms);

app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

require('./socket').setup(io);

var server = http.listen(3001, 
	function() {
		var port = server.address().port;
		console.log('example app listening at ' + port);
	});

