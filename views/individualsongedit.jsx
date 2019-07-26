var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');

class EditSong extends React.Component {
  render() {

    var name = '';

    let options = this.props.artistName.map(artist => {
      if (artist.id === this.props.song.artist_id) {
        name = artist.name;
        return <option value={artist.id} selected> {artist.name} </option>;
      }else {
        return <option value={artist.id}> {artist.name} </option>;
      }
    });

    return ( 
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : {this.props.song.title} </title>
      	</HEAD>
      	<BODY>
      		<BANNER />
          <div className={'row'}>
        		<div className={'mt-4 col-4 offset-2 editartist'}>
              <img id={'editimage'}src={this.props.song.artwork} />
              <p> {this.props.song.title} </p>
              <p> {this.props.song.album} </p>    
              <a href={this.props.song.preview_link}>Preview Link</a>  
              <a href={`/artists/${this.props.song.artist_id}`}>{name}</a>    
        		</div>
            <div className={'mt-4 col-4'}>
              <form className = {'mr-4'} method={'POST'} action={`/songs/${this.props.song.id}?_method=PUT`}>
                <div className={"form-group"}>
                  <label for={"songname"}>Song's Title</label>
                  <input type={"text"} className={"form-control"} id={"songtitle"} aria-describedby={"Song's Title"} defaultValue={this.props.song.title} name={'title'} />
                </div>
                <div className={"form-group"}>
                  <label for={"songalbum"}>Song's Album</label>
                  <input type={"text"} className={"form-control"} id={"songalbum"} aria-describedby={"Song's Album"} defaultValue={this.props.song.album} name={'album'} />
                </div>
                <div className={"form-group"}>
                  <label for={"songpreview_link"}>Song's Preview Link</label>
                  <input type={"text"} className={"form-control"} id={"songpreview_link"} aria-describedby={"Song's Preview Link"} defaultValue={this.props.song.preview_link} name={'preview_link'} />
                </div>
                <div className={"form-group"}>
                  <label for={"songartwork"}>Song's Artwork URL</label>
                  <input type={"text"} className={"form-control"} id={"songartwork"} aria-describedby={"Song's Artwork"} defaultValue={this.props.song.artwork} name={'artwork'} />
                </div>
                <div className={"form-group"}>
                  <label for={"songartist"}>Song's Artist</label>
                  <select className={"form-control"} id={"songartist"} name={'artist_id'}>
                    {options}
                  </select>
                </div>
                <button type={'submit'} className={'btn btn-dark btn-lg'}> Edit Song</button>
              </form>
            </div>
          </div>
      	</BODY>
      </html>
    );
  }
}

module.exports = EditSong;