var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artists extends React.Component {
	render() {
		let artists = this.props.artists.map( (artist) =>{
			let link = "/artists/"+artist.id;
			return <div className="col-3"><a href={link}><img className="img-fluid" src={artist.photo_url}/>{artist.name}</a></div>
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
