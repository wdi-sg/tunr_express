var React = require("react");

class NewSongToPlaylist extends React.Component {
  render() {
    const id = this.props.id
    const actionURL = "/playlist/"+id

    const allSongs = this.props.songs.map((item) => {
        return <option value={item.id}>{item.title}</option>
    })
    return (
      <html>
        <head />
        <body>
        <form action={actionURL} method="POST">
            <select name="song" id="">
                {allSongs}
            </select>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSongToPlaylist;
