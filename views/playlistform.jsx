var React = require('react');

class Playlistform extends React.Component {
	render() {
		return (
			<html>
				<head />
				<body>
					<h3>Add a new playlist here!</h3>
					<img src="https://media.giphy.com/media/JrepS1wJ2Jt081yAsn/giphy.gif" />
					<br />
					<form method="POST" action="/playlists">
						<p>Playlist Name:</p>
						<input type="text" name="name" />
						<br />
						<br />
						<input type="submit" value="Submit" />
						<br />
					</form>
				</body>
			</html>
		);
	}
}

module.exports = Playlistform;
