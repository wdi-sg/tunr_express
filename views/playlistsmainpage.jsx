var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var PLAYLIST = require('./components/playlist.jsx');

class PlaylistMainPage extends React.Component {
  render() {
  	let playlists = this.props.playlists.map(playlist => {
  		return  <ARTIST playlistData = {playlist} />;
  	});

    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : Playlist Index </title>
      	</HEAD>
      	<BODY>
     		<BANNER />
      		<div className={'mt-4 showall'}>
      			{playlists}
      		</div>
      	</BODY>
      </html>
    );
  }
}

module.exports = PlaylistMainPage;
