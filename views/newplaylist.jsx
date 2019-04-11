var React = require("react");

class NewPlaylist extends React.Component {
  render() {

    //get list of all possible songs
    const songs = this.props.songs.map(song => {
        return <div><input type="checkbox" name="song_id" value={song.id}/> {song.title}</div>;
    })

    return (
      <html>
        <head />
        <body>
          <h3>Create a playlist</h3>
            <form method="POST" action="/playlist">
                Name <input type="text" name="name"/>

                <p>Songs</p>
                {songs}


                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;