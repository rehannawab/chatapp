import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import ChatWindow from './ChatWindow';
import Participants from './Participants';
import ChatInput from './ChatInput';
import {browserHistory} from 'react-router';

var containerStyle={
    "paddingRight":250
}

/**
 * Main Chat App
 * 
 * @class ChatApp
 * @extends {Component}
 */
class ChatApp extends Component {

    /**
     * Creates an instance of ChatApp.
     * 
     * @param {any} props
     * 
     * @memberOf ChatApp
     */
    constructor(props){
        super(props);
        this.props = props;
    }

    
    /**
     * 
     * Component will Mount method
     * 
     * @memberOf ChatApp
     */
    componentWillMount() {
        
        //If there is no room in local storage, redirect to join
        if(localStorage.getItem("room") !== "")
        {
            browserHistory.push("/join");
        }
    }
    

    /**
     * 
     * 
     * @returns
     * 
     * @memberOf ChatApp
     */
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
