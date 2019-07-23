var React = require("react");

class Artists extends React.Component {
	render() {
		let artists = this.props.artists.map( (artist) =>{
			let link = "/artists/"+artist.id;
			return <li><a href={link}>{artist.name}</a></li>
		})
		return (
			<html>
			<head/>
			<body>
				<h1>List of Artists</h1>
				<ul>
					{artists}
				</ul>
			</body>
			</html>
		);
	}
}

module.exports = Artists;
