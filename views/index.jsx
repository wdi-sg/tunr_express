var React = require("react");

class Index extends React.Component {
  render() {

    const themArtists = this.props.artists.map((artist) => {
        return <li>{artist.name}</li>;
    });

    return (
      <html>
        <head />
        <body>
          <h1>Available Artists:</h1>
            <ul>
                {themArtists}
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = Index;