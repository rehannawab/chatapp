import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import ContentSend from 'material-ui/svg-icons/content/send';
import Actions from './actions/ChatActions';

/**
 * Chat Input box class
 */
class ChatInput extends Component {

    constructor(props) {
        super(props);

        this.onChatInputChange = this.onChatInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            message: ""
        }
    }

    /**
     * Send message
     */
    sendMessage() {
        var message = {
            username: "Me",
            message: this.state.message
        }

        //Clear Input
        this.setState({
            message: ""
        })

        //Invoke action to send message
        Actions.sendMessage(message);
    }

    onChatInputChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    render() {
        return (
            <div className="row">

                <div className="col-md-11">
                    <TextField
                        hintText="Type Here!!!"
                        fullWidth={true}
                        onChange={this.onChatInputChange}
                        value={this.state.message}
                        />
                </div>
                <div className="col-md-1">
                    <ContentSend
                        onClick={this.sendMessage}
                        />
                </div>

            </div>
        );
    }
}

export default ChatInput;
