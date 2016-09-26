import Rx from 'rxjs/Rx';

/**
 * Connect to room
 * 
 * @export
 * @param {any} room
 * @param {any} password
 * @param {any} username
 * @returns Observable
 */
export function connectToRoom(room, password, username) {
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
export function createRoom(room, password) {
    return Rx.Observable.create(function(observer){
        socket.emit("createRoom", room, password, function(err){
            if(err) observer.error();
            else observer.next();
        });
    })
}