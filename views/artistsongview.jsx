const React = require('react');
const Head = require('./head');
const Nav = require('./nav');

class SongView extends React.Component {
  render() {
    let artistLink = `/artists/${this.props.aid}`;
    let artistSongsLink = `/artists/${this.props.aid}/songs`;
    let song = this.props.song;

    return (
      <html>
        <Head />

        <body>
          <div className="container text-center">
            <div className="row my-3">
              <div className="col-8 offset-2">

                <Nav />

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

              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SongView;
