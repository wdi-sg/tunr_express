var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
	render() {
		let artist = this.props.artist;
		let editLink = "/artists/"+artist.id+"/edit/";
		let deleteLink = "/artists/"+artist.id+"?_method=DELETE";
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
						<button className="btn btn-dark" data-toggle="modal" data-target="#deleteAlert">Delete Artist</button>
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
								<button type="button" className="btn btn-dark" data-dismiss="modal">Return</button>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>

		);
	}
}

module.exports = Artist;
