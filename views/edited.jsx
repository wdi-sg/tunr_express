var React = require("react");

class Edited extends React.Component {
  render() {

    const themArtists = this.props.artists.map((artist) => {
        return <p>{artist}</p>;
    });

    return (
      <html>
        <head />
        <body>
          <h1>Updated Artist:</h1>
            <div>
                {themArtists}
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Edited;