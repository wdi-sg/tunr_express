var React = require("react");

class Home extends React.Component {
  render() {
        let artistData = this.props.artists.map((artist) => {
            return <tr><td>{artist.id}</td>
            <td><a href={"/artists/"+artist.id}>{artist.name}</a><p className="text-right" ><a href={"/artists/"+artist.id+"/edit"}>Edit Info</a></p></td>
            <td><img src={artist.photo_url} width="150px" height="150px"/></td>
            <td>{artist.nationality}</td></tr>

        });
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
          <h1 className="text-center">Artists Index Page</h1>
          <table className="table">
            <thead className="thead-light">
            <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PHOTO</th>
            <th>NATIONALITY</th>
            </tr>
            </thead>
            <tbody>
                {artistData}
            </tbody>
          </table>
        </body>
      </html>
    );
  }
}

module.exports = Home;
