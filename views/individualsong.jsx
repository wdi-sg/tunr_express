var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var SONG = require('./components/song.jsx');

class IndividualSong extends React.Component {
  render() {
    return ( 
      <html>
      	<HEAD>>
      		<title> Tunr 1.0 : {this.props.song.title} </title>
      	</HEAD>
      	<BODY>
      		<BANNER />
      		<div className={'mt-4 showall'}>
      			<SONG songData = {this.props.song}>
              <a href={`/artists/${this.props.song.artist_id}`}>{this.props.artistName}</a>
            </SONG>
      		</div>
          <div className={'formbuttons mt-3'}>
            <form className = {'editbutton mr-4'} method={'GET'} action={`/songs/${this.props.song.id}/edit`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Edit Song</button>
            </form>
            <form className = {'deletebutton'} method={'GET'} action={`/songs/${this.props.song.id}/delete`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Delete Song </button>
            </form>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = IndividualSong;