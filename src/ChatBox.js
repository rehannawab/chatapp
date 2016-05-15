var React = require('react');
var ReactDOM = require('react-dom');
var ChatBody = require('./ChatBody');
var ChatFooter = require('./ChatFooter');

var ChatBox = React.createClass({

	componentDidMount: function() {
		socket.on("messageFromServer", this.messageReceived);	
	},

	messageReceived: function(message) {
		console.log("Message received " + message.message);
		var messagesModified = this.state.messages.slice();
		message.direction = "left";
		messagesModified.push(message);
		this.setState({
			messages: messagesModified
		});
	},

	getInitialState: function() {
		return {
			messages: []
		};
	},

	onMessageSend: function(message) {
		var newId = this.state.messages.length + 1;
		var messageToSend = {
			id: newId,
			message: message,
			user: "",
			time: "NOW",
		};
		socket.emit("messageFromClient", messageToSend);
		var messagesModified = this.state.messages.slice();
		messageToSend.user = "Me";
		messageToSend.direction = "right";
		messagesModified.push(messageToSend);
		this.setState({
			messages: messagesModified
		})
	},

	render: function() {
		return (
			<div id="demo-chat-body" className="collapse in">
    			<ChatBody messages={this.state.messages}/>
    			<ChatFooter messageSentHandler={this.onMessageSend}/>
    		</div>
		);
	}
});

module.exports = ChatBox;