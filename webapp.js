// Server


var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use('/static', express.static('static'));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bugsdb';

var db;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/static/index.html');

});

io.on('connection', function(socket){
  console.log('a user connected from ' + socket.handshake.address);
  socket.on("messageFromClient", function(data){
  	data.user = socket.handshake.address;
  	console.log("Message " + data.message + " received from " + data.user);
  	socket.broadcast.emit("messageFromServer", data);
  });
});

MongoClient.connect(url, function(err, dbConnection) {
	db = dbConnection;

	var server = http.listen(3001, function() {
		var port = server.address().port;
		console.log('example app listening at ' + port);
	});

});

