var React = require('react');

class addSong extends React.Component {
  render() {

    return (
      <html>
        <body>
          <div>
            <h1>Adding new song to playlist</h1>
            <form action="/playlists" method="POST">
                Enter Artist Information Here:
                <br></br>
                <input type="text" name="name" placeholder="name"/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = addSong;