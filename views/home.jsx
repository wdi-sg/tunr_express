var React = require("react");

class Home extends React.Component {
  render() {
        // console.log('home.jsx')
        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        } else {
            cookiesVisits = cookiesVisits+1;
        }
    return (
      <html>
        <head />
        <body>
          <h1>Tunr Express</h1>
            <div>
                <a href="/artists">Artists</a>
            </div>
            <div>
                <a href="/songs">Songs</a>
            </div>
            <div>
                <a href="/playlists">My Playlist</a>
            </div>

            <div>
                <p>Visits: {cookiesVisits}</p>
            </div>
        </body>
      </html>
    );
  }
}
module.exports = Home;
