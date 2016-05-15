var React = require('react');
var ReactDOM = require('react-dom');
var MessageBox = require('./MessageBox');

var ChatBody = React.createClass({
	componentDidUpdate: function(prevProps, prevState) {
		var element = document.getElementById("scrollable");
		element.scrollTop = element.scrollHeight;
	},

	render: function() {
		var messages = this.props.messages.map(function(message){
			return(
				<MessageBox 
					key = {message.id}
					message = {message.message}
					direction = {message.direction}
					user = {message.user}
					time = {message.time} 
				/>
				);
		})
		return (
			<div className="nano has-scrollbar" style={{height : 380}}>
				<div id="scrollable" className="nano-content pad-all" tabindex="0" style={{right: -17}}>
					<ul className="list-unstyled media-block">
						{messages}
					</ul>
				</div>
    			<div className="nano-pane">
                    <div className="nano-slider" style={{height: 141 , transform: "translate(0, 0)"}}>
                        
                    </div>
                </div>
            </div>
		);
	}
});

module.exports = ChatBody;