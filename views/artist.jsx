var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
	render() {
		let artist = this.props.artist;
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-6">
						<h1>{artist.name}</h1>
						<p>Artist ID: {artist.id}</p>
						<p>Nationality: {artist.nationality}</p>
						<img className="img-fluid" src={artist.photo_url}/>
						<hr/>
						<p><a href="/artists/">See all Artists</a></p>
						<p><a href="/songs/">See all Songs</a></p>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Artist;
