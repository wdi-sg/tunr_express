const React = require('react');
const Head = require('./head');
const Nav = require('./nav');

class ArtistSongs extends React.Component {
  render() {
    let backLink = `/artists/${this.props.id}`;
    let songs = this.props.songs;
    let count = songs.length;

    let songList, songTable, headerText, deleteText;
    if (count === 0) {
      headerText =
        <h5 className="p-2 text-center">
          There are no {this.props.name} songs in the database. <br />
        </h5>;
      songTable = "";

    } else {
      headerText =
        <h5 className="p-2 text-center">
          There are {count} {this.props.name} songs in the database. <br />
        </h5>;

      songList = songs.map(song => {
        let key = `song-${song.id}`;
        let link = `/artists/${this.props.id}/songs/${song.id}`;

        return (
          <tr key={key}>
            <td><a href={link} className="text-info">{song.title}</a></td>
            <td>{song.album}</td>
          </tr>
        )
      });

      songTable =
        <div className="my-3"
             style={{overflowY: "scroll", maxHeight: "70vh"}}>
          <table className="table">
            <thead>
              <tr>
                <td className="h5 text-center"
                    colSpan="2">Songs in Database:
                </td>
              </tr>
            </thead>
            <tbody>
              {songList}
            </tbody>
          </table>
        </div>;
    }

    return (
      <html>
        <Head />

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col-8 offset-2">

                <Nav />

                {headerText}
                {songTable}
                <a href={backLink}
                   className="btn btn-info btn-block my-3">
                  Go Back to Artist Page
                </a>

                <a href="songs/new"
                   className="btn btn-info btn-block my-3">
                  Add a Song for this Artist
                </a>

              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
