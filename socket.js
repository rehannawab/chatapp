var mongoose = require('mongoose');

var Room = mongoose.model('Room');

module.exports.setup = function(io)
{
    io.on('connection', function(socket){

        socket.on("messageFromClient", function(data){
            data.username = socket.username;
            socket.to(socket.room).broadcast.emit("messageFromServer", data);
        });

        /**
         * Create a room
         */
        socket.on("createRoom", function(room, password, callback){
            var room = new Room({room: room, password: password});
            room.save({room: room, password: password}, callback);
        })

        /**
         * When user connects to a room, supplying room, password, username and a callback
         */
        socket.on("connectToRoom", function(roomName, password, username, callback){

            //authenticateConnection
            Room.authenticateRoomConnection(roomName, password, function(err, room){
                if(err){
                    return callback(err);
                }

                //if authenticated add the user to the room
                room.addUser({id: socket.id, username: username}, function(err){
                    if(err) {return console.log(err);}
                    else{
                        console.log("room updated");
                        //set socket values and broadcast connection to other users
                        socket.room = room.room;
                        socket.username = username;
                        socket.join(room.room);
                        console.log("Joining room " + room.room);
                        socket.to(socket.room).broadcast.emit("userConnected", socket.username);
                    }
                });

                callback(null);

            })
            

        })

        /**
         * When user disconnects
         */
        socket.on("disconnect", function(){

            Room.findOne({room: socket.room}, function(err, room){
                if(err) return console.log(err)
                room.removeUser({id: socket.id}, function(err){
                    if(err){
                        console.log(err);
                    }
                });
            })

            socket.to(socket.room).broadcast.emit("userDisconnected", socket.username);
        })

    });
}