var React = require("react");

class AllArtists extends React.Component {
  render() {

    const artistArr = this.props.artists;

    const artistElements = artistArr.map ( artist=> {
      return (
        <div className="artist" key={artist.id}>
          <h1>{artist.id}) {artist.name}</h1>
          <img src={artist.photo_url}></img>
        </div>
      )
    })

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
          {artistElements}
        </body>
      </html>
    );
  }
}

module.exports = AllArtists;
