const React = require("react");

class AddPlaylist extends React.Component {
  render() {
    return (
      <div>
        <h1>add a new playlist</h1>
        <form action="/playlists" method="POST">
            <input type="text" name="name" placeholder="enter playlist name"/><br/>
            <input type="submit" value="add playlist"/>
        </form>
        <a href="/artists/">return to main</a>
      </div>
    );
  }
}

module.exports = AddPlaylist;
