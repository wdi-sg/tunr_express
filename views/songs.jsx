var React = require("react");

class Songs extends React.Component {
  render() {
     console.log('in form');
     console.log(this.props.artistSongs);

     let songs = this.props.artistSongs.map(song => {
        return (
                <li>{song.title}</li>
        )
     });
     // console.log("artist name: ", artistsList[0].name);

    return (
      <html>
        <body>
          <h2>Songs by</h2>
          <ul>{songs}</ul>

        </body>
      </html>
    );
  }
}

module.exports = Songs;