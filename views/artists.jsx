var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artists extends React.Component {
	render() {
		let artists = this.props.artists.map( (artist) =>{
			let link = "/artists/"+artist.id;
			let imgStyle = {
				backgroundImage: "url(" + artist.photo_url  + ")"
			};
			return (
				<div className="col-3">
					<a href={link}>
						<div className="img-thumbnail" style={imgStyle}></div>
						<p className="caption">{artist.name}</p>
					</a>
				</div>
			);
		});
		return (
			<DefaultLayout>
				<div className="row">
					{artists}
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Artists;
