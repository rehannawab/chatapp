import Rx from 'rxjs/Rx';

/**
 * Creating a class to handle Socket
 * 
 * @class Socket
 */
class Socket {

    /**
     * Connect to room
     * 
     * @export
     * @param {any} room
     * @param {any} password
     * @param {any} username
     * @returns Observable
     */
    connectToRoom(room, password, username) {
        return Rx.Observable.create(function(observer){
            socket.emit("connectToRoom", room, password, username, function(result){
                observer.next(result);
            });
        })
    }

    /**
     * Create room
     * 
     * @export
     * @param {any} room
     * @param {any} password
     * @returns Observable
     */
    createRoom(room, password) {
        return Rx.Observable.create(function(observer){
            socket.emit("createRoom", room, password, function(err){
                if(err) observer.error();
                else observer.next();
            });
        })
    }

    /**
     * Send message to server
     * 
     * @param {any} message
     * 
     * @memberOf Socket
     */
    sendMessage(message) {
        socket.emit("messageFromClient", message);
    }

    /**
     * Receive messages from server
     * 
     * @returns
     * 
     * @memberOf Socket
     */
    receiveMessages() {
        return Rx.Observable.create(function(observer){
            socket.on("messageFromServer", function(data){
                observer.next(data);
            });
        })
    }
}

export default new Socket();