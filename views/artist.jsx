var React = require("react");

class Artist extends React.Component {
  render() {

    const artist = this.props.artistData;
    
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <div className="artist">
            <h1>
              {artist.id}) {artist.name}
            </h1>
            <img src={artist.photo_url}></img>
            <p>Nationality: {artist.nationality}</p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
