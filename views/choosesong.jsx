var React = require('react');

class Choosesong extends React.Component {
	render() {
		// as i understand, x becomes your this.props.song
		let allsongs = this.props.songs.map((x) => {
			return (
				<span>
					<p>
						{x.id}. {x.title}
					</p>
				</span>
			);
		});

		return (
			<html>
				<head />
				<body>
					<h3>Populate your playlist with an existing song!</h3>
					<br />
					<p>Song list:</p>
					{allsongs}
					<form method="POST" action={'/playlists/' + this.props.id}>
						<p>Input song id here:</p>
						<input type="text" name="id" />
						<br />
						<input type="submit" value="Submit" />
						<br />
					</form>
				</body>
			</html>
		);
	}
}

module.exports = Choosesong;
