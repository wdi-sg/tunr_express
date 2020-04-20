const React = require('react');

class NewPlaylist extends React.Component {
	render () {

		return (
			<form action="/playlist" method="POST">
			<input type="text" name="name"/>
			<input type="submit" value="Add New Playlist"/>
			</form>
		)
	}
	
}

module.exports = NewPlaylist;