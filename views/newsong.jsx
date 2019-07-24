var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');

class NewSong extends React.Component {
  render() {
    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : New Song </title>
      	</HEAD>
      	<BODY>
     		<BANNER />
      		<div className={'mt-4 newartists'}>
      			<form className = {'mr-4'} method={'POST'} action={`/songs/new`}>
              <div className={"form-group"}>
                <label for={"songname"}>Song's Title</label>
                <input type={"text"} className={"form-control"} id={"songtitle"} aria-describedby={"Song's Title"} placeholder={"Enter Song's Title"} name={'title'} />
              </div>
              <div className={"form-group"}>
                <label for={"songalbum"}>Song's Album</label>
                <input type={"text"} className={"form-control"} id={"songalbum"} aria-describedby={"Song's Album"} placeholder={"Enter Song's Album"} name={'album'} />
              </div>
              <div className={"form-group"}>
                <label for={"songpreview_link"}>Song's Preview Link</label>
                <input type={"text"} className={"form-control"} id={"songpreview_link"} aria-describedby={"Song's Preview Link"} placeholder={"Enter Song's Preview Link"} name={'preview_link'} />
              </div>
              <div className={"form-group"}>
                <label for={"songartwork"}>Song's Artwork URL</label>
                <input type={"text"} className={"form-control"} id={"songartwork"} aria-describedby={"Song's Artwork"} placeholder={"Enter Song's Artwork"} name={'artwork'} />
              </div>
              <div className={"form-group"}>
                <label for={"songartist"}>Song's Artist</label>
                <input type={"text"} className={"form-control"} id={"songartist"} aria-describedby={"Song's Artist"} placeholder={"Enter Song's Artist"} name={'artist'} />
              </div>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Submit New Song</button>
            </form>
      		</div>
      	</BODY>
      </html>
    );
  }
}

module.exports = NewSong;
