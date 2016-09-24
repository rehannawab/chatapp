import Alt from '../lib/Alt';

/**
 * Flux Chat Actions
 * 
 * @class ChatActions
 */
class ChatActions {
    /**
     * Send message
     * 
     * @param {any} message
     * @returns message which will be passed to the store
     * 
     * @memberOf ChatActions
     */
    sendMessage(message) {
        return message;
    }
}

export default Alt.createActions(ChatActions);