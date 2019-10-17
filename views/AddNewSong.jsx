const React = require("react");

class AddNewSong extends React.Component {
  render() {

    const { name, id } = this.props.playlist;
    return (
      <div>
        <h1>add a new song to playlist: {name}</h1>
        <form action={`/playlists/${id}`} method="POST">
            <input type="text" name="id" placeholder="enter song id"/><br/>
            <input type="submit" value="add song to playlist"/>
        </form>
        <a href="/playlists/">return to main</a>
      </div>
    );
  }
}

module.exports = AddNewSong;
