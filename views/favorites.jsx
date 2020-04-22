const React = require('react');

class Favorites extends React.Component {
	render () {
		const song_list = this.props.songs;
		const sorted_song_list = song_list.sort((a, b) => {
			if (a.title > b.title) {
				return 1;
			} else if (a.title < b.title) {
				return -1;
			} else {
				return 0;
			}
		})
		const songs = sorted_song_list.map(song => {
			return <option value={song.id}>{song.title} , Album: {song.album}</option>
		})

		return (
			<body>
				<form action="/favorites" method="POST">
					<p>
					Choose a song:<br/>
					<select name="song_id">
						{songs}
					</select><br/><br/>
					<input type="submit" value="Add To Favorites"/>
					</p>
				</form>
				<p id="visits" data-visits={this.props.visits}>
				Number of visits: {this.props.visits}<br/>
				</p> 
			<script src="/script.js"></script>
			</body>
		)
	}
	
}

module.exports = Favorites;