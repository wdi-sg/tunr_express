var React = require("react");

class Newplaylist extends React.Component {
  render() {
    // CSS stuff

    // Javascript stuff
    const visits = this.props.visits;

    return (
      <html>
        <head />
        <body>
          <h1>New Playlist</h1>
          <div>
            <p>You've been here {visits} times</p>
          </div>
          <form action="/playlists/show" method="post">
            <input type="text" name="playlist" placeholder="playlist name"></input>
            <input type="submit" value="Get Playlist!"></input>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;