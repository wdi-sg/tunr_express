var React = require("react");

class Home extends React.Component {
  render() {

    const artistArr = this.props.artists;

    const artistElements = artistArr.map ( artist=> {
      return (
        <div className="artist">
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
          <h1>Welcome!</h1>
          {artistElements}
        </body>
      </html>
    );
  }
}

module.exports = Home;
