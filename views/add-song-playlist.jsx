var React = require('react');

class AddSongToPlaylist extends React.Component {

    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Add Song to Playlist</h1>
            <h2>Insert either ID or Song Title</h2>
            <form action="/playlist" method="POST">
            ID:<input name="song_id"/>
            <br></br>
            Song Title:<input name="song_title"/>
            <br></br>
            <input type="submit" value="Submit"></input>
            </form>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = AddSongToPlaylist;