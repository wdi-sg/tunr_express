var React = require("react");

class Artist extends React.Component {
	render() {
		let artist = this.props.artist;
		return (
			<html>
			<head/>
			<body>
			<h1>{artist.name}</h1>
			<p>Artist ID: {artist.id}</p>
			<p>Nationality: {artist.nationality}</p>
			<img src={artist.photo_url}/>
			<hr/>
				<p><a href="/artists/">See all Artists</a></p>
				<p><a href="/songs/">See all Songs</a></p>
			</body>
			</html>
		);
	}
}

module.exports = Artist;
