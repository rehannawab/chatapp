var React = require('react');
var ReactDOM = require('react-dom');
var Avatar = require('./Avatar.js');
var Message = require('./Message.js');

var MessageBox = React.createClass({
	render: function() {
		return (
				<li className="mar-btm">
					<Avatar direction = {this.props.direction} />
					<Message 
						message = {this.props.message}
						direction = {this.props.direction}
						user = {this.props.user}
						time = {this.props.time}
					/>
				</li>
		);
	}
})


module.exports = MessageBox;