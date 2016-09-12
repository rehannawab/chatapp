import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import Participants from './Participants';
import ChatInput from './ChatInput';
import {browserHistory} from 'react-router';

var containerStyle={
    "paddingRight":250
}

class ChatApp extends Component {

    constructor(props){
        super(props);
        this.props = props;
    }

    
    componentWillMount() {
        
        if(localStorage.getItem("room") !== "")
        {
            browserHistory.push("/join");
        }
    }
    

    render() {
        return (
            <div className="container-fluid wrapper" style={containerStyle}>
                <div className="row chat-app">
                    
                    <div className="col-md-12 chat-window">
                        <div className="chat-box">
                            <ChatWindow
                            />
                        </div>
                        <div className="chat-input">
                            <ChatInput
                            />
                        </div>
                    </div>
                </div>
                <Participants
                />
                {this.props.children}
            </div>
            
        );
    }
}

export default ChatApp;
