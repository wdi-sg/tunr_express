const React = require('react');

class ShowPlaylist extends React.Component {
	render () {
		const song_list = this.props.songs;
		const songs = song_list.map(song => {
			return <li>{song.title}</li>
		})
		return (
			<body>
				<p>
				Playlist Id: {this.props.id}<br/>
				Playlist Name: {this.props.name}<br/>
				Songs in playlist:
					<ul>
						{songs}
					</ul>
					<a href={'/playlist/'+this.props.id+'/newsong'}>Choose songs to be added to this playlist</a><br/>
				</p>
				<a href="/playlist">
					<input type="button" value="Back to all playlists"/>
				</a>
				<p id="visits" data-visits={this.props.visits}>
				Number of visits: {this.props.visits}<br/>
				</p> 
			<script src="/script.js"></script>
			</body>
		)
	}
}

module.exports = ShowPlaylist;