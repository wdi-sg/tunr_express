var React = require("react");
var Layout = require("./layout");

class Playlistindex extends React.Component {
  render() {

    const thePlaylists = this.props.playlist.map((playlist) => {
        return  (
            <tr>
                <td>{playlist.id}</td>
                <td>{playlist.name}</td>
            </tr>
        );
    });

    return (
        <Layout>
          <h1>Available Playlists:</h1>
            <table class="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Playlists</th>
                    </tr>
                </thead>
                <tbody>
                    {thePlaylists}
                </tbody>
            </table>
        </Layout>
    );
  }
}

module.exports = Playlistindex;