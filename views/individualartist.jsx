var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');
var ARTIST = require('./components/artist.jsx');

class IndividualArtist extends React.Component {
  render() {
    return ( 
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : {this.props.artist.name} </title>
      	</HEAD>
      	<BODY>
      		<BANNER />
      		<div className={'mt-4 showall'}>
      			<ARTIST artistData = {this.props.artist} />
      		</div>
          <div className={'formbuttons'}>
            <form className = {'editbutton mr-4'} method={'GET'} action={`/artists/${this.props.artist.id}/edit`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Edit Artist</button>
            </form>
            <form className = {'deletebutton'} method={'GET'} action={`/artists/${this.props.artist.id}/delete`}>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Delete Artist </button>
            </form>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = IndividualArtist;