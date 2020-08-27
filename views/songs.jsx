var React = require("react");

class Songs extends React.Component {
  render() {
    let artistInfo = this.props.rows;
    console.log(artistInfo)
    let songs = artistInfo.map(song => {
    return <tr>
        <td>{song.id}</td>
        <td>{song.name}</td>
        <td>{song.title}</td>
        <td>{song.album}</td>
        <td><audio controls><source src={song.preview_link} type="audio/mpeg/m4a"/></audio></td>
        <td><img src={song.artwork} alt="song artwork" width="50"/></td>
    </tr>
    })

    return (
      <html>
        <head />
        <body>
          <div>
            <h2>Songs List</h2>
            <div>
              <table>
                <tr>
                  <th>No.</th>
                  <th>Artist</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Preview</th>
                  <th>Artwork</th>
                </tr>
                {songs}
              </table>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Songs;
