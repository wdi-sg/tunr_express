var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var ARTIST = require('./components/artist.jsx');

class DeleteArtist extends React.Component {
  render() {
    return ( 
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : {this.props.artist.name} </title>
      	</HEAD>
      	<BODY>
      		<BANNER />
      		<div className={'mt-4 showartists'}>
      			<ARTIST artistData = {this.props.artist} />
      		</div>
          <div className={'formbuttons'}>
            <p> Confirm Delete? </p>
            <form className = {'editbutton mr-4'} method={'POST'} action={`/artists/${this.props.artist.id}/delete?_method=DELETE`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Yes</button>
            </form>
            <form className = {'deletebutton'} method={'GET'} action={`/artists/${this.props.artist.id}`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> NO </button>
            </form>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = DeleteArtist;