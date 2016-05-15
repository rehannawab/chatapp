var React = require('react');
var ReactDOM = require('react-dom');

var Avatar = React.createClass({
	render: function() {
		var divClassName = "media-" + this.props.direction;
		return (
			<div className={divClassName}>
				<img src="http://bootdey.com/img/Content/avatar/avatar2.png" className="img-circle img-sm" alt="Profile Picture" />
			</div>
		);
	}
});


module.exports = Avatar;