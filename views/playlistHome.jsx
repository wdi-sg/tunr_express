var React = require("react");

class playlistHome extends React.Component {
  render() {
    const tablebody = this.props.playlist.map(item => {
      return (
        <tbody>
          <tr>
            <td>{item.id}</td>
            <td>{item.playlist_name}</td>
          </tr>
        </tbody>        
      );        
    });

    return (
      <html>
        <head />
        <body>
          <h1>Playlist library</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Playlist name</th>
              </tr>
            </thead>
            {tablebody}
          </table>
        </body>
      </html>
    );
  }
}

module.exports = playlistHome;
