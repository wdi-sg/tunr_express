var React = require("react");

class SongNew extends React.Component {
  render() {

        var url = `/artists/${this.props.artists.id}/songs`+ "?_method=POST";
    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/new.css"/>
        </head>
        <body>
          <h3>Add a song from {this.props.artists.name}</h3>
          <div className="wrapper_new">
                <form action={url} method="POST">
                    <p>Title: </p><input type="text" className="input-field" name="title"/>
                    <p>Album: </p><input className="input-field" name="album"/>
                    <p>Preview Link: </p><input className="input-field" name="preview_link"/>
                    <p>Artwork: </p><input className="input-field" name="artwork"/>
                    <p></p><input type="hidden" className="input-field" name="artist_id" defaultValue={this.props.artists.id}/>
                    <p><input type="submit" value="Submit"/></p>
                </form>
                <p><a href={`/artists/${this.props.artists.id}/songs`}>Back to Song List</a></p>
            </div>


        </body>
      </html>
    );
  }
}

module.exports = SongNew;
