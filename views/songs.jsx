var React = require("react");

class Songs extends React.Component {
  render() {

    const songs = this.props.songs.map(song => {
        return <p>{song.title}</p>
    });

    return (
      <html>
        <head />
        <body>
            {songs}
        </body>
      </html>
    );
  }
}

module.exports = Songs;