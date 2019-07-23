var React = require("react");

class Songs extends React.Component {
  render() {
        let songsData = this.props.songs.map((song) => {
            return <tr><td>{song.id}</td>
            <td>{song.title}</td>
            <td>{song.album}</td>
            <td><a href="{song.preview_link}">{song.preview_link}</a></td>
            <td><img src={song.artwork} width="80px" height="80px"/></td>
            <td>{song.artist_id}</td></tr>
        });
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
          <h1 className="text-center">Artist Songs List</h1>
          <table className="table">
            <thead className="thead-light">
            <tr>
            <th>SONGS ID</th>
            <th>TITLE</th>
            <th>ALBUM</th>
            <th>PREVIEW_LINK</th>
            <th>ARTWORK</th>
            <th>ARTIST_ID</th>
            </tr>
            </thead>
            <tbody>
                {songsData}
            </tbody>
          </table>
        </body>
      </html>
    );
  }
}

module.exports = Songs;
