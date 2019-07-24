var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
	render() {
		let artist = this.props.artist;
		let editLink = "/artists/"+artist.id+"/edit/";
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-6">
						<h1>{artist.name}</h1>
						<p>Artist ID: {artist.id}</p>
						<p>Nationality: {artist.nationality}</p>
						<img className="img-fluid" src={artist.photo_url}/>
						<hr/>
						<a className="btn btn-dark" href={editLink}>Edit Artist</a>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Artist;
