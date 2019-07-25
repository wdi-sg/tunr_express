var React = require("react");
const Template = require('./template.jsx');

class NewSong extends React.Component {
  render() {
    console.log(this.props.artistId);
    var artistId = this.props.artistId;
    var url = "/artists/" + this.props.artistId + "/songs/";

    console.log("url is " + url);

    return (
      <Template>
      <h1>Add a new song for this artist</h1>
      <form action= {url} method="POST">
        <label>Title</label><br/>
        <input type="text" name="title"/><br/><br/>
        <label>Album</label><br/>
        <input type="text" name="album"/><br/><br/>
        <label>Preview Link</label><br/>
        <input type="text" name="preview_link"/><br/><br/>
        <label>Artwork</label><br/>
        <input type="text" name="artwork"/><br/><br/>
        <label>Artist</label><br/>
        <input type="text" name="artist_id" value={artistId}/><br/><br/>
        <input type="submit" value="Add Artist"/>
      </form>
      </Template>
    );
  }
}

module.exports = NewSong;
