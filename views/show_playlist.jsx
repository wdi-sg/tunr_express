const React = require('react');

class ShowPlaylist extends React.Component {
	render () {
		const song_list = this.props.songs;
		const songs = song_list.map(song => {
			return <li>{song.title}</li>
		})
		return (
			<div>
				<p>
				Playlist Id: {this.props.id}<br/>
				Playlist Name: {this.props.name}<br/>
				Songs in playlist:
					<ul>
						{songs}
					</ul>
				<a href={'/playlist/'+this.props.id+'/newsong'}>Choose songs to be added to this playlist</a><br/>
				<a href="/playlist">See all playlists</a>
				</p>
			</div>
		)
	}
}

module.exports = ShowPlaylist;