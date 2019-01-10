var React = require("react");

class EachSong extends React.Component {
  render() {
    let id= this.props.song[0].id;
    let imgLink = this.props.song[0].artwork;
    let title = this.props.song[0].title;
    let artist = this.props.song[0].name;
    let artistId = this.props.song[0].artist_id;
    let album = this.props.song[0].album;
    let previewLink = this.props.song[0].preview_link;

    return (
      <html>
        <head />
        <body>
          <img src={imgLink}/>
          <h3>{title}</h3>
          <h4>Artist: <a href={"/artist/" + artistId}>{artist}</a> </h4>
          <h5>Album: {album}</h5><br/>
          <a href={previewLink}>Preview Link</a><br/>
          <a href={"/song/" + id + "/edit"}>Edit {title}'s information</a>
        </body>
      </html>
    );
  }
}

module.exports = EachSong;
