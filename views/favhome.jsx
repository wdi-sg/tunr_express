var React = require("react");

class Favhome extends React.Component {
  render() {
    const songs = this.props.songs.map( song => {
        return (
            <li>{song.title}</li>
        );
    })
    return (
      <html>
        <head />
        <body>
          <h1>Favorites</h1>
            <form method="GET" action='/favorites/new'>
              <input type="submit" value="Add Song"/>
            </form>
          <ul>
            {songs}
          </ul>
          <p><a href="http://localhost:3000/artists" alt="homepage">Back to Homepage</a></p>
        </body>
      </html>
    );
  }
}

module.exports = Favhome;