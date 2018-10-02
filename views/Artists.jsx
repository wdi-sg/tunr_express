var React = require("react");

class Artists extends React.Component {
  render() {
    const list = this.props.artists.map(artist => {
      const link = `/artists/${artist.id}`;
      return (
        <li key={artist.id}>
          <a href={link}>{artist.name}</a>
        </li>
      );
    });

    return (
      <html>
        <head />
        <body>
          <h1>Artists</h1>
          <ul>
            {list}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
