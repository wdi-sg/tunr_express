var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
	render() {
		let newSongLink = "/artists/"+this.props.id+"/songs/new";
		let songs = this.props.songs;
		let songsDisplay = songs.map(song => {
			let imgStyle = {
				backgroundImage: "url(" + song.artwork  + ")"
			};
			let formLink = "/favourites/"+song.id;
			return (<div className="col-4">
				<div className="img-thumbnail" style={imgStyle}>
					<p className="caption">{song.title}</p>
					<form method="POST" action={formLink}>
						<button type="submit" className="btn-fav btn btn-link">
							<i className="fas fa-star"></i>
						</button>
					</form>
				</div>
			</div>);
		});
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-4">
						<div className="position-fixed">
							<a className="btn btn-dark" href={newSongLink}>Add Song</a>
						</div>
					</div>
					<div className="col-8">
						<div className="row">
							{songsDisplay}
						</div>
					</div>
				</div>
			</DefaultLayout>

		);
	}
}

module.exports = Artist;
