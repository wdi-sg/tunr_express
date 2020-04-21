var React = require("react");

class Favorites extends React.Component {
  render() {
    const songs = this.props.songList;
    const user = this.props.user;

    const songList = songs.map(song => {
      return (
        <li>{song.title}</li>
        );
    });

    return (
      <html>
        <head />
        <body>
          <h3>{user.username}'s Favorite Songs...</h3>
          <ul>
          {songList}
          </ul>
          <form method='GET' action='/favorites/new'>
            <input type='submit' value='Add Favorite'/>
          </form>
        </body>
      </html>
      );
  }
}

module.exports = Favorites;