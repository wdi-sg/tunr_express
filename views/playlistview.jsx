const React = require('react');
const Template = require('./template');

class PlaylistView extends Template {
  constructor(props) {
    super(props);
    this.title = props.listname;
  }

  renderContent() {
    let listname = this.props.listname;
    let songs = this.props.playlist.map(song => {
      let key = `song-${song.id}`;

      return (
        <tr key={key} className="text-info">
          <td>{song.title}</td>
          <td>{song.album}</td>
          <td>{song.name}</td>
        </tr>

      );

    });

    return (
      <React.Fragment>
        <div className="my-3"
             style={{overflowY: "scroll", maxHeight: "70vh"}}>
          <table className="table">
            <thead>
              <tr>
                <td className="h5 text-center"
                    colSpan="3">{listname}
                </td>
              </tr>
              <tr>
                <td scope="col">Title</td>
                <td scope="col">Album</td>
                <td scope="col">Artist</td>
              </tr>
            </thead>
            <tbody>
              {songs}
            </tbody>
          </table>
        </div>

        <a href="/playlists/new"
           className="btn btn-info btn-block my-3">
          Add New Playlist
        </a>

      </React.Fragment>
    );
  }
}

module.exports = PlaylistView;
