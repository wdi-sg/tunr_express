var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var SONG = require('./components/song.jsx')

class ArtistSongs extends React.Component {
  render() {
    let songs = this.props.songs.map(song => {
      return  <SONG songData = {song} />;
    });

    return ( 
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : {this.props.artist.name} </title>
      	</HEAD>
      	<BODY>
      		<BANNER />
          <div className={'row'}>
        		<div className={'mt-4 col-4 offset-2 editartist'}>
              <img id={'editimage'}src={this.props.artist.photo_url} />
              <p> {this.props.artist.name} </p>
              <p> {this.props.artist.nationality} </p>
              <a href={`/artists/${this.props.artist.id}/songs`}>View Songs</a> 
              <form className = {'artistsongbutton'} method={'GET'} action={`/artists/${this.props.artist.id}/songs/new`}>
                  <button type={'submit'} className={'btn btn-dark btn-lg'}> Add Song by {this.props.artist.name}</button>
              </form>
        		</div>
            <div className={'mt-4 col-6 artistsongdisplay'}>
                {songs}
            </div>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = ArtistSongs;