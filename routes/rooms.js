var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Room = mongoose.model('Room');

router.get('/:room', function(req, res) {
    Room.findOne({room: req.params.room}, function(err, room){
        if(err || !room){
            res.status(404).send('Room not found');
        }
        else{
            res.json(room);
        }
    })
});

module.exports = router;
