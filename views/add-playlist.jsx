var React = require('react');

class AddPlaylist extends React.Component {

    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Add New Playlist</h1>
            <form action="/playlist" method="POST">
            Playlist Name:<input name="playlist_name" placeholder="Enter Name"/>
            <br></br>
            <input type="submit" value="Create"></input>
            </form>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = AddPlaylist;