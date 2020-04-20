const React = require('react');
const Template = require('./template');

class ArtistSongView extends Template {
  constructor(props) {
    super(props);
    this.title = `${props.song.title}`;
    this.count = props.sitecount || "YOU DIDN'T PASS A COUNTER (sitecount)";
  }

  renderContent() {
    let artistLink = `/artists/${this.props.aid}`;
    let artistSongsLink = `/artists/${this.props.aid}/songs`;
    let song = this.props.song;

    return (
      <React.Fragment>
        <h4>{song.title}</h4>
        <h6>{song.album}</h6>
        <img src={song.artwork} width="200px" /><br />
        <audio controls src={song.preview_link}>
          No audio support.
        </audio>

        <a href={artistSongsLink}
           className="btn btn-info btn-block my-3">
          Go Back to Artist Songs
        </a>

        <a href={artistLink}
           className="btn btn-info btn-block">
          Go Back to Artist Page
        </a>

      </React.Fragment>
    );
  }
}

module.exports = ArtistSongView;
