var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <div>
        <form action="/playlist" method="post" id="playlist">
          <div>
            <label htmlFor="name">Playlist name: </label>
            <input type="text" name="name"/>
          </div>
        </form>
        <button type="submit" form="playlist" value="submit">
            Add
        </button>
      </div>
    );
  }
}

module.exports = NewPlaylist;