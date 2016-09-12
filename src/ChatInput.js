import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import ContentSend from 'material-ui/svg-icons/content/send';

class ChatInput extends Component {
    render() {
        return (
            <div className="row">

                <div className="col-md-11">
                    <TextField
                        hintText="Type Here!!!"
                        fullWidth={true}
                    />
                </div>
                <div className="col-md-1">
                    <ContentSend
                    />
                </div>
                
            </div>
        );
    }
}

export default ChatInput;
