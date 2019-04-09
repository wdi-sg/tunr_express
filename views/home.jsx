var React = require("react");

class Home extends React.Component {
  render() {
    let artists = this.props.artists;
    let artistList = artists.map((artist)=> {
        let artistLink = '/artists/' + artist.id;
        return (
            <tr>
                <th>{artist.id}</th>
                <th><a href={artistLink}>{artist.name}</a></th>
                <th>{artist.nationality}</th>
            </tr>
        )
    })
    return (
      <html>
        <head>
            <title>Tunr 1.0</title>
        </head>
        <body>
            <h1>Tunr 1.0 Database</h1>
            <div className="displayContainer">
            <table>
                <thead>
                    <tr>
                      <th id="tableId">ID</th>
                      <th id="tableName">Artist Name</th>
                      <th id="tableNationality">Nationality</th>
                    </tr>
                </thead>
                {artistList}
            </table>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;