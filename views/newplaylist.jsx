var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');

class NewPlayList extends React.Component {
  render() {
    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : New PlayList </title>
      	</HEAD>
      	<BODY>
     		<BANNER />
      		<div className={'mt-4 newartists'}>
      			<form className = {'mr-4'} method={'POST'} action={`/playlist/new`}>
              <div className={"form-group"}>
                <label for={"playlisttitle"}>PlayList's Title</label>
                <input type={"text"} className={"form-control"} id={"playlistname"} aria-describedby={"Playlist's Title"} placeholder={"Enter Playlist's Title"} name={'title'} />
              </div>
              <div className={"form-group"}>
                <label for={"playlistphoto"}>Playlist's Photo URL</label>
                <input type={"text" } className={"form-control"} id={"playlistphoto"} aria-describedby={"Playlist's Photo"} placeholder={"Enter Playlist's Photo URL"} name={'playlist_image'} />
              </div>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Submit New PlayList</button>
            </form>
      		</div>
      	</BODY>
      </html>
    );
  }
}

module.exports = NewPlayList;
