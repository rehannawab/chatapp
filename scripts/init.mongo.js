var db = new Mongo().getDB("chatapp");

db.rooms.remove({});