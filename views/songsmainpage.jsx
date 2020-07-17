var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var SONG = require('./components/song.jsx');

class SongMainPage extends React.Component {
  render() {
  	let songs = this.props.songs.map(song => {
  		return  <SONG songData = {song} />;
  	});

    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : Songs Index </title>
      	</HEAD>
      	<BODY>
     		<BANNER />
      		<div className={'mt-4 showall'}>
      			{songs}
      		</div>
      	</BODY>
      </html>
    );
  }
}

module.exports = SongMainPage;