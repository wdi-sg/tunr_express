var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
	render() {
		let newSongLink = "/artists/"+this.props.id+"/songs/new";
		let songs = this.props.songs;
		let songsDisplay = songs.map(song => {
			return (<div className="col-3">
				<img className="img-fluid" src={song.artwork}/>
				<h1>{song.name}</h1>
				<p>Album: {song.album}</p>
				<p><a href={song.preview_link} target="_blank">Preview it here</a></p>
			</div>);
		});
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-10">
						<div className="row">
							{songsDisplay}
						</div>
					</div>
					<div className="col-2">
						<a className="btn btn-dark" href={newSongLink}>Add Song</a>
					</div>
				</div>
			</DefaultLayout>

		);
	}
}

module.exports = Artist;
