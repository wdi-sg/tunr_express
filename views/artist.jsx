var React = require("react");

class Artist extends React.Component {
  render() {
        const bkgrd = {backgroundImage:`url(${this.props.artists.photo_url})`};
        var url = "/artists/"+this.props.artists.id + "?_method=DELETE";

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/artist.css"/>
        </head>
        <body>
          <h3>Artist</h3>
            <div className="wrapper_new">
                <div style={bkgrd} className="img_wrapper"></div>
                <p>{this.props.artists.nationality}</p>
                <h2>{this.props.artists.name}</h2>

            </div>
            <div>
            <form action={url} method="POST">
                <a href={`/artists/${this.props.artists.id}/edit`}>Edit</a><span> | </span>
                <input type="submit" value="Delete"/>
            </form>
            </div>
            <a href={`/artists/${this.props.artists.id}/songs`}><p>Other songs from this artist</p></a>
            <a href="/artists/"><p>Home</p></a>

        </body>
      </html>
    );
  }
}

module.exports = Artist;
