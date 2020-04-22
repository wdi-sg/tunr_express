var React = require("react");
class New extends React.Component {
  render() {
    const songNames = this.props.songs.map((songs)=>{
        return <option value={songs.artist_id}>{songs.title}</option>
    });
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/playlist/newsong">
                  <p>Playlist Name: {this.props.playlist.name}</p>
                  <select name="artist_id">
                            {songNames}
                  </select>
                  <p><button type="submit">Submit</button></p>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
