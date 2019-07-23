var React = require("react");

class Home extends React.Component {
  render() {
        let artistData = this.props.artists.map((artist) => {
            return <tr><td>{artist.id}</td>
            <td><a href={"/artists/"+artist.id}>{artist.name}</a></td>
            <td><img src={artist.photo_url} width="150px" height="150px"/></td>
            <td>{artist.nationality}</td><td><div className="icons"><a href={"/artists/"+artist.id+"/edit"}><img src="edit_g.svg" width="50px" height="50px"/></a><a href={"/artists/"+artist.id+"/delete"}><img src="trash_g.svg" width="50px" height="50px"/></a></div></td></tr>

        });
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        <link rel="stylesheet" href="style.css"></link>
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
            <th></th>
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
