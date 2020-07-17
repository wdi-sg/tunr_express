var React = require("react");

class Songs extends React.Component {
  render() {
     console.log('in form');
     console.log(this.props.artistSongs);

     let songs = this.props.artistSongs.map(song => {
        return (
            <div>
            <a href={`/artist/${song.artist_id}/songs/${song.id}`}>
                <li>{song.title}</li>
            </a>
            </div>
        )
     });
     // console.log("artist name: ", artistsList[0].name);

    return (
      <html>
        <body>
          <h2>Songs by {this.props.artistSongs[0].name}</h2>
            <form action="/artist" method="GET">
            <input type="submit" value="Back to artists index"/>
          </form>
          <ul>{songs}</ul>

        </body>
      </html>
    );
  }
}

module.exports = Songs;