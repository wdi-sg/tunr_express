var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var ARTIST = require('./components/artist.jsx');

class ArtistMainPage extends React.Component {
  render() {
  	let artists = this.props.artists.map(artist => {
  		return  <ARTIST artistData = {artist} />;
  	});

    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : Artist Index </title>
      	</HEAD>
      	<BODY>
     		<BANNER />
      		<div className={'mt-4 showall'}>
      			{artists}
      		</div>
      	</BODY>
      </html>
    );
  }
}

module.exports = ArtistMainPage;
