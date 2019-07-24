var React = require("react");

class NewSong extends React.Component {
  render() {
        console.log(this.props);
        console.log(this.props.artists[0]);
        let artist=this.props.artists[0];
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
          <h3 className="text-center">CREATE NEW SONG</h3>
          <form method="POST" action={"/artist/"+artist.id+"/songs?_method=POST"} className="text-center">
                <p>Title</p><input name="title" size="45"/>
                <p>Album</p><input name="album" size="45"/>
                <p>Preview Link</p><input name="preview_link" size="45"/>
                <p>Artwork</p><input name="artwork" size="45"/>
                <p></p><input name="artist_id" value={artist.id} type="hidden" size="45"/>
                <p><input value="Submit" type="submit"/></p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;
