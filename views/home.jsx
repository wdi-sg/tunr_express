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

        let userButtons = (
                <div>
                    <p><a href="/register">register</a></p>
                    <p><a href="/login">login</a></p>
                </div>
                );
        let message = "";
        if(this.props.cookies['logged in'] === "true"){
            userButtons = (
                <div>
                    <p><a href="/favourites">Favourite</a></p>
                    <form action="/logout?_method=delete" method="POST">
                        <input type="submit" value="log-out"/>
                    </form>
                </div>
                );
        } else {
            message = "You are not logged in.";
        };

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css" />
        </head>
        <body>
          <h1>Tunr Express</h1>
            <div>
                <p><a href="/artists">Artists</a></p>
                <p><a href="/songs">Songs</a></p>
                <p><a href="/playlists">My Playlist</a></p>
            </div>
            <p>{message}</p>
            <br />
            {userButtons}
            <br/>
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
