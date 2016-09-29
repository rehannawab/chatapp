import Alt from '../lib/Alt';
import ChatActions from '../actions/ChatActions';
import Socket from '../socket/Socket';

/**
 * Chat Store (Alt Flux architecture)
 * 
 * @class ChatStore
 */
class ChatStore {
    /**
     * Creates an instance of ChatStore.
     * 
     * 
     * @memberOf ChatStore
     */
    constructor() {
        let { sendMessage } = ChatActions;

        this.bindListeners({
            send : sendMessage
        });

        this.state = {
            messages: []
        };

        /**
         * Subscribe to receiving messages from socket.
         */ 
        Socket.receiveMessages()
            .subscribe((message) => {
                var newMessages = this.state.messages.concat(message);
                this.setState({messages : newMessages});
            })
    }

    /**
     * Send the message
     * 
     * @param {any} message
     * @returns
     * 
     * @memberOf ChatStore
     */
    send(message) {
        Socket.sendMessage(message);
        var newMessages = this.state.messages.concat(message);
        this.setState({messages : newMessages});
        return this.state;
    }
}

export default Alt.createStore(ChatStore, 'ChatStore');