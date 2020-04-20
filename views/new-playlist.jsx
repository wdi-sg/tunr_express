var React = require("react");

class NewPlaylist extends React.Component {
  render() {
        // console.log("new-playlist.jsx");

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

    return (
      <html>
        <head />
        <body>
            <a href='/'>Back to Main</a>
            <br />
            <br />
            <a href='/playlists'>Playlists</a>
            <br />
          <h3>Add New Playlist</h3>
          <form method="POST" action="/playlists">
            <p>Playlist Name: <input name="name"/></p>
            <p><input type="submit" value="Add Playlist"/></p>
          </form>
          <br/>
          <div>
              <p>Visits: {cookiesVisits}</p>
          </div>
        </body>
      </html>
    );
  }
};

module.exports = NewPlaylist;
