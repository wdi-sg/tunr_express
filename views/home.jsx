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
        <head>
            <link rel="stylesheet" type="text/css" href="style.css" />
        </head>
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
            <br />
            <div>
                <p>Visits: <span className="cookiesV">{cookiesVisits}</span></p>
                <p className="badge-title">User's Badge</p>
                <p className="badge"></p>
            </div>
            <script src="/script.js"></script>
        </body>
      </html>
    );
  }
}
module.exports = Home;
