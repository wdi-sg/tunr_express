var React = require("react");

class Delete extends React.Component {
  render() {
      let artist=this.props.artists[0];
      console.log(artist);

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
        <h3 className="text-center">DELETE ARTIST INFO</h3>
        <div className="alert alert-danger text-center" role="alert">
			Are you sure you want to delete?
			</div>
        <form method="POST" action={"/artist/"+artist.id+"?_method=DELETE"} className="text-center">
              <p>Name</p><input name="name" value={artist.name} size="45"/>
              <p>Photo URL</p><input name="photo_url" value={artist.photo_url} size="45"/>
              <p>Nationality</p><input name="nationality" value={artist.nationality} size="45"/>
              <p></p>
              <p><input value="Submit" type="submit"/></p>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;