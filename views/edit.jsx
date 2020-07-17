var React = require('react');

class Edit extends React.Component {
	render() {
		return (
			<html>
				<head>
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
						integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
						crossOrigin="anonymous"
					/>
				</head>
				<body>
					<h1>Edit artist: {this.props.name}</h1>
					<img src="https://media.giphy.com/media/3oz8xTvw09iBpRxtle/giphy.gif" />
					<br />
					<br />
					<form method="POST" action={'/artists/' + this.props.id + '?_method=put'}>
						Artist info:<br />
						<p>Name:</p>
						<input type="text" name="name" value={this.props.name} />
						<br />
						<p>Photo</p>
						<input type="url" name="photo_url" value={this.props.photo} />
						<br />
						<p>Nationality</p>
						<input type="text" name="nationality" value={this.props.nationality} />
						<br />
						<input type="submit" value="Make Edits!" />
					</form>
				</body>
			</html>
		);
	}
}

module.exports = Edit;
