var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Room = mongoose.model('Room');

router.get('/', function(req, res) {
    Room.find({room: req.query.room}, function(err, room){
        if(err){
            res.send(410, 'Room not found');
        }
        else{
            res.json(room);
        }
    })
});

module.exports = router;
