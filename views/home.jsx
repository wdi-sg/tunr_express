var React = require("react");

class Artists extends React.Component {
	render() {
		return (
			<html>
			<head/>
			<body>
			<h1>Hello World!</h1>
				<p><a href="/artists/">See all Artists</a></p>
				<p><a href="/songs/">See all Songs</a></p>
			</body>
			</html>
		);
	}
}

module.exports = Artists;
