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
            callback({authenticated: false}, null);
        }

        if(password === room.password)
        {
            callback({authenticated: true}, room);
        }
        else
        {
            callback({authenticated: false}, null);
        }

    })
}

mongoose.model('Room', RoomSchema);