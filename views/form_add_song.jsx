const React = require('react');

class AddSong extends React.Component {
	render () {
		const song_list = this.props.songs;
		const link = `/playlist/${this.props.id}`
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
			<form action={link} method="POST">
				<p>
				Playlist Id: {this.props.id}<br/>
				Playlist Name: {this.props.name}<br/>
				Choose a song:<br/>
				<select name="song_id">
					{songs}
				</select><br/>
				<input type="submit" value="Add New Song"/>
				</p>
			</form>
		)
	}
	
}

module.exports = AddSong;