var React = require("react");

class Playlist extends React.Component {
  render() {

    let playlist = this.props.playlists.map(playlist => {
        return <div>
        <h1>{playlist.id} {playlist.name}</h1>
        </div>;
    });

    let playlistName = this.props.playlists.map(playlist => {
        return  <tr>
                    <td>{playlist.id}</td>
                    <td>{playlist.name}</td>
                </tr>;
    })

    return (
      <html>
        <head />
        <body>

            <table>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                </tr>

                    {playlistName}

            </table>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;