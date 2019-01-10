var React = require("react");

class Home extends React.Component {
  render() {

    const allArtists = this.props.artists.map( artist => {
        let artistURL = "/artists/" + artist.id;
        return <li><a href={artistURL}>{artist.name}</a></li>
    });

    return (
      <html>
        <head>
        <title>All artists</title>
        </head>

        <body>
          <h1>All artists:</h1>
          <ul>{allArtists}</ul>

          <button><a href="/new">Add new artist</a></button>
        </body>
      </html>
    );

  }
}

module.exports = Home;
