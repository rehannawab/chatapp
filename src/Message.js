var React = require('react');
var ReactDOM = require('react-dom');

var Message = React.createClass({
	render: function() {
		var divClassName = "media-body pad-hor"
		if(this.props.direction == "right")
		{
			divClassName = divClassName + " speech-right"
		} 
		return (
			<div className={divClassName}>
				<div className="speech">
					<a href="#" className="media-heading">{this.props.user}</a>
					<p>{this.props.message}</p>
					<p className="speech-time">
						<i className="fa fa-clock-o fa-fw"></i> {this.props.time}
					</p>
				</div>
			</div>
		);
	}
})


module.exports = Message;