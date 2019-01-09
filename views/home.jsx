var React = require("react");

class Home extends React.Component {
  render() {

    const allArtists = this.props.artists.map( artist => {
        return <li>{artist.name}</li>
    });

    return (
      <html>
        <head />
        <body>
          <h1>Displaying all artists:</h1>
          <ul>{allArtists}</ul>
        </body>
      </html>
    );

  }
}

module.exports = Home;
