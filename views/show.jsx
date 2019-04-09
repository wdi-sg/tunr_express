var React = require("react");

class Show extends React.Component {
  render() {

    const theArtist = this.props.artist.map((selectArtist) => {
        return <li>{selectArtist.name}</li>;
    });

    return (
      <html>
        <head />
        <body>
          <h1>Selected Artist:</h1>
            <ul>
                {theArtist}
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = Show;