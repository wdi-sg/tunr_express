var React = require("react");

class Home extends React.Component {
  render() {

    const artists = this.props.artists.map((artist)=> {
        return (
        <tr>
            <td>{artist.id}</td>
            <td>{artist.name}</td>
            <td>{artist.nationality}</td>
            <td><img src={artist.photo_url} width="100px"/></td>
        </tr>
        )
    });


    return (
      <html>
        <head />
        <body>
            <h1>Index of artists</h1>
            <table>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Picture</th>
                    {artists}
                </tr>
            </table>
        </body>
      </html>
    );
  }
}

module.exports = Home;