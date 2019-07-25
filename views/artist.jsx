var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
	render() {
		let artist = this.props.artist;
		let editLink = "/artists/"+artist.id+"/edit/";
		let deleteLink = "/artists/"+artist.id+"?_method=DELETE";
		let viewSongsLink = "/artists/"+artist.id+"/songs";
		let addSongsLink = "/artists/"+artist.id+"/songs/new";
		let imgStyle = {
			backgroundImage: "url(" + artist.photo_url  + ")"
		};
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-4">
						<div className="img-thumbnail" style={imgStyle}></div>
						<div className="buttons">
							<a className="btn btn-dark" href={editLink}>Edit Artist</a>
							<button className="btn btn-danger" data-toggle="modal" data-target="#deleteAlert">Delete
								Artist
							</button>
						</div>
					</div>
					<div className="col-8">
						<h1>{artist.name}</h1>
						<p>Artist ID: {artist.id}</p>
						<p>Nationality: {artist.nationality}</p>
						<hr/>
						<div class="buttons">
							<a className="btn btn-dark" href={viewSongsLink}>View Songs</a>
							<a className="btn btn-dark" href={addSongsLink}>Add Songs</a>
						</div>
					</div>
				</div>
				<div className="modal fade" id="deleteAlert" tabIndex="-1" role="dialog" aria-labelledby="deleteAlertTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="deleteAlertTitle">Confirm delete the following?</h5>
							</div>
							<div className="modal-body">
								<div className="container">
									<div className="row">
										<div className="col-12">
											<h4>{artist.id}. {artist.name}</h4>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<form method="POST" action={deleteLink}>
									<button type="submit" className="btn btn-danger">Confirm Delete</button>
								</form>
								<button type="button" className="btn btn-dark" data-dismiss="modal">Back</button>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>

		);
	}
}

module.exports = Artist;
