var React = require("react");

class EachPlaylist extends React.Component {
  render() {

    let artistId = this.props.artistSongs[0].id;
    let artist = this.props.artistSongs[0].artist_name;
    let eachSong = this.props.artistSongs.map(song => {
      return (<li>{song.song_title}</li>);
    })

    return (
      <html>
        <head />
        <body>
          <h3>
              <a href={"/artist/" + artistId}>{artist}'s Songs</a><br/>
          </h3>
          <h5>
            <a href={"/artist/" + artistId + "/songs/new"}>Add more songs!</a><br/>
            <ul>
                {eachSong}
            </ul>
          </h5>

        </body>
      </html>
    );
  }
}

module.exports = EachPlaylist;
