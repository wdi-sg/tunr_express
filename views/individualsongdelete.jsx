var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var SONG = require('./components/song.jsx');

class DeleteSong extends React.Component {
  render() {
    return ( 
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : {this.props.song.title} </title>
      	</HEAD>
      	<BODY>
      		<BANNER />
      		<div className={'mt-4 showall'}>
      			<SONG songData = {this.props.song} />
      		</div>
          <div className={'formbuttons'}>
            <p> Confirm Delete? </p>
            <form className = {'editbutton mr-4'} method={'POST'} action={`/songs/${this.props.song.id}/delete?_method=DELETE`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Yes</button>
            </form>
            <form className = {'deletebutton'} method={'GET'} action={`/songs/${this.props.song.id}`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> NO </button>
            </form>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = DeleteSong;