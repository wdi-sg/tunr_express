var React = require("react");
var DefaultLayout = require('./layouts/default');

class Favourites extends React.Component {
	render() {
		let songs = this.props.faves.map( (song) =>{
			let imgStyle = {
				backgroundImage: "url(" + song.artwork  + ")"
			};
			return (
				<div className="col-3">
					<a href="#">
						<div className="img-thumbnail" style={imgStyle}>
							<p className="caption">{song.title}</p>
						</div>
					</a>
				</div>
			);
		});
		return (
			<DefaultLayout>
				<div className="row">
					<div class="col">
						<h2>Favourites</h2>
					</div>
				</div>
				<div className="row">
					{songs}
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Favourites;
