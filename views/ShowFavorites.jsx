const React = require("react");

class ShowFavorites extends React.Component {
  render() {
    return (
      <div>
          <h1>Favorite songs</h1>
          <ul>
          { this.props.songs.map(song => (
              <li>{song.title}</li>
          ))}
          </ul>
        <hr />
      </div>
    );
  }
}

module.exports = ShowFavorites;
