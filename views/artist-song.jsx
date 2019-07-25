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
			return (<div className="col-4">
				<div className="img-thumbnail" style={imgStyle}>
					<p className="caption">{song.title}</p>
				</div>
			</div>);
		});
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-4 ">
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
