var React = require("react");

class AllArtists extends React.Component {
  render() {

    const artistArr = this.props.artists;

    const artistLinks = artistArr.map((artist) => {
      return (
        <li key={artist.id}><a href={`/artists/${artist.id}`}>{artist.name}</a></li>
      );
    });

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
          <a href="/">
            <button className="btn btn-primary">Back To Home</button>
          </a>
          <h1>All Artists</h1>
          <ul>{artistLinks}</ul>
        </body>
      </html>
    );
  }
}

module.exports = AllArtists;
