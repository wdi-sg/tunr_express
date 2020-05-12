var React = require("react");

class Favorites extends React.Component {
  render() {

    const favoriteSongs = this.props.favSongList.map((songs) => {
        return (
            <div>
                <li>{songs.title}</li>
            </div>
        );
    });

    return (
        <html>
            <head />
            <body>
              <h1>My Favorite Songs</h1>
              <ul>
                  {favoriteSongs}
              </ul>
            </body>
        </html>
      );
  }
}


module.exports = Favorites;
