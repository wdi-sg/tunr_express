var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');

class EditArtist extends React.Component {
  render() {
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
        		</div>
            <div className={'mt-4 col-4'}>
              <form className = {'mr-4'} method={'POST'} action={`/artists/${this.props.artist.id}?_method=PUT`}>
                <div className={"form-group"}>
                  <label for={"artistname"}>Artist's Name</label>
                  <input type={"text"} className={"form-control"} id={"artistname"} aria-describedby={"Artist's Name"} defaultValue ={this.props.artist.name} name={'name'} />
                </div>
                <div className={"form-group"}>
                  <label for={"artistphoto"}>Artist's Photo URL</label>
                  <input type={"text" } className={"form-control"} id={"artistphoto"} aria-describedby={"Artist's Photo"} defaultValue ={this.props.artist.photo_url} name={'photo_url'} />
                </div>
                <div className={"form-group"}>
                  <label for={"artistnationality"}>Artist's Nationality</label>
                  <input type={"text" } className={"form-control"} id={"artistnationality"} aria-describedby={"Artist's Nationality"} defaultValue ={this.props.artist.nationality} name={'nationality'} />
                </div>
                <button type={'submit'} className={'btn btn-dark btn-lg'}> Edit Artist</button>
              </form>
            </div>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = EditArtist;