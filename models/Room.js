var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	room: String,
	password: String,
    users: [{id: String, username: String}]
});

RoomSchema.methods.addUser = function(user, callback) {
    this.users.push(user);
    this.save(callback);
}

RoomSchema.methods.removeUser = function(user, callback) {
    filteredUsers = this.users.filter(function(element){
        return user.id !== element.id;
    });

    if(filteredUsers.length === 0)
    {
        this.remove(callback);
    }
    else{
        this.users = filteredUsers;
        this.save(callback);
    }
}

RoomSchema.statics.authenticateRoomConnection = function(roomName, password, callback){
    this.model('Room').findOne({room: roomName}, function(err, room){
        if(err)
        {
            callback(new Error("Room not found"), null);
        }

        if(password === room.password)
        {
            callback(null, room);
        }
        else
        {
            callback(new Error("Wrong password"), null);
        }

    })
}

mongoose.model('Room', RoomSchema);