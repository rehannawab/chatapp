import React, {Component} from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from './stores/ChatStore';
import ChatMessage from './ChatMessage';

//TODO: Remove this temporary count for key
var count = 1;

/**
 * Chat Window which displays all chat messages
 */
class ChatWindow extends Component {

    /**
     * Returns chat stores for use in alt-utils connectToStores
     */
    static getStores() {
        return [ChatStore];
    }

    /**
     * Returns props from stores for use in alt-utils connectToStores
     */ 
    static getPropsFromStores() {
        return ChatStore.getState();
    }

    render() {
        let messages = this.props.messages.map(function(message) {
            return (<ChatMessage
                        key={count++}
                        message={message}
                    />)
        })
        return (
            <div>
                {messages}
            </div>
        );
    }
}

//Decorate with connectToStores from alt-utils
export default connectToStores(ChatWindow);
