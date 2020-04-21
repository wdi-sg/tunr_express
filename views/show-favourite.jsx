var React = require("react");

class ShowPlaylist extends React.Component {
  render() {
        // console.log('show-playlist.jsx')

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        let user = this.props.cookies.user;
        console.log(user);


        //link to Home Page
        let homeLink = "/"

        //link to Artist Page
        let allFavouritesLink = "/favourites"

        let userFavourites = this.props.userFavourite;

        const favouriteSongLists = userFavourites.map((userFavourite) => {
            return <li key={userFavourite.song_id}><a href={"/songs/"+userFavourite.song_id}>{userFavourite.song_id}</a></li>
        })

    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css" />
      </head>
        <body>
            <p><a href={homeLink}>Back to Main</a></p>
            <h3>{user}'s Favourites</h3>
            <p><a href="/favourites/new">Add Songs to Favourite</a></p>
            <div>
                <ul>{favouriteSongLists}</ul>
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
};

module.exports = ShowPlaylist;