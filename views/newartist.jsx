var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');

class NewArtist extends React.Component {
  render() {
    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : New Artist </title>
      	</HEAD>
      	<BODY>
     		<BANNER />
      		<div className={'mt-4 newartists'}>
      			<form className = {'mr-4'} method={'POST'} action={`/artists/new`}>
              <div className={"form-group"}>
                <label for={"artistname"}>Artist's Name</label>
                <input type={"text"} className={"form-control"} id={"artistname"} aria-describedby={"Artist's Name"} placeholder={"Enter Artist's Name"} name={'name'} />
              </div>
              <div className={"form-group"}>
                <label for={"artistphoto"}>Artist's Photo URL</label>
                <input type={"text" } className={"form-control"} id={"artistphoto"} aria-describedby={"Artist's Photo"} placeholder={"Enter Artist's Photo URL"} name={'photo_url'} />
              </div>
              <div className={"form-group"}>
                <label for={"artistnationality"}>Artist's Nationality</label>
                <input type={"text" } className={"form-control"} id={"artistnationality"} aria-describedby={"Artist's Nationality"} placeholder={"Enter Artist's Nationality"} name={'nationality'} />
              </div>
              <button type={'submit'} className={'btn btn-dark btn-lg'}> Submit New Artist</button>
            </form>
      		</div>
      	</BODY>
      </html>
    );
  }
}

module.exports = NewArtist;
