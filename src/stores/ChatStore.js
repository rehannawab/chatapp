import Alt from '../lib/Alt';
import ChatActions from '../actions/ChatActions';

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
        var newMessages = this.state.messages.concat(message);
        this.setState({messages : newMessages});
        console.log(this.state);
        return this.state;
    }
}

export default Alt.createStore(ChatStore, 'ChatStore');