var React = require('react');
var ReactDOM = require('react-dom');

var ChatFooter = React.createClass({

	getInitialState: function() {
		return ({
			message: ""
		});
	},

	onMessageSend: function(){
		this.props.messageSentHandler(this.state.message);
		this.setState({
			message: ""
		});
	},

	_handleKeyPress: function(e){
		if (e.key === 'Enter') {
	      this.onMessageSend();
	    }
	},

	onInputChange: function(e) {
		this.setState({message: e.target.value});
	},

	render: function() {
		return (
			<div className="panel-footer">
				<div className="row">
					<div className="col-xs-9">
						<input 
							type="text" 
							placeholder="Enter your text" 
							className="form-control chat-input" 
							onChange={this.onInputChange}
							value={this.state.message}
							onKeyPress = {this._handleKeyPress} />
					</div>
					<div className="col-xs-3">
						<button className="btn btn-primary btn-block" type="submit" onClick={this.onMessageSend}>Send</button>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ChatFooter;