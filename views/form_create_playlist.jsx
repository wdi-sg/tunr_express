const React = require('react');

class NewPlaylist extends React.Component {
	render () {

		return (
			<body>
				<div>
					<form action="/playlist" method="post">
					<input type="text" name="name"/>
					<input type="submit" value="Create New Playlist"/>
					</form>
				</div>
				<p id="visits" data-visits={this.props.visits}>
				Number of visits: {this.props.visits}<br/>
				</p> 
			</body>
		)
	}
	
}

module.exports = NewPlaylist;