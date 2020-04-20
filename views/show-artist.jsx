var React = require("react");

class ShowArtist extends React.Component {
  render() {
        // console.log('show-artist.jsx')
        let artistData = this.props.artist.rows[0];

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };


        //link to Home Page
        let homeLink = "/"

        //link to Artist Page
        let allArtistsLink = "/artists"

        //link to edit Artist
        const artistEditLink = "/artists/" + artistData.id + "/edit";

        const artistDeleteLink = "/artists/" + artistData.id + "?_method=delete";

        const artistSongsLink = "/artists/" + artistData.id + "/songs"

    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="style.css" />
      </head>
        <body>
            <p><a href={homeLink}>Back to Main</a></p>
            <p><a href={allArtistsLink}>All Artists</a></p>
            <p><a href={artistEditLink}>Edit Artist Profile</a></p>
            <h3>Artist</h3>
            <p>Name: {artistData.name}</p>
            <p>Photo url: {artistData.photo_url}</p>
            <p>Nationality: {artistData.nationality}</p>
            <p><a href={artistSongsLink}>Songs</a></p>
            <br/>
            <br/>
            <form method="POST" action={artistDeleteLink}>
                <input type="submit" value="delete Artist"/>
            </form>
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
};

module.exports = ShowArtist;