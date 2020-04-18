var React = require("react");
var DisplayOneSongMod = require("./display-one-song-mod");
var Main = require("./main");

class DisplayAllSongs extends React.Component {
  render() {
    let artist = this.props.artist;

    let songs = this.props.songs.map((element) => {
      return <DisplayOneSongMod song={element} />;
    });

    const displayAllSongsByArtist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Songs By {artist}</u>
            </h3>
            <br></br>
            {songs}
          </div>
        </div>
      </div>
    );

    return <Main children={displayAllSongsByArtist} />;
  }
}

module.exports = DisplayAllSongs;
