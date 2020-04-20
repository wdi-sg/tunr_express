var React = require("react");

class NewSong extends React.Component {
  render() {
        // console.log("new-song.jsx");
        // console.log(this.props.rows)

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        let artistsData = this.props.allArtists.rows;
        // console.log(artistsData)
        let songsLink = "/songs";
        // console.log(songsLink);

        const artistsOptionsElements = artistsData.map((artist) => {
            return <option key={artist.id} value={artist.id}>{artist.name}</option>
        })

    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css" />
      </head>
        <body>
            <a href='/'>Back to Main</a>
            <br />
            <br />
            <a href='/songs'>All Songs</a>
            <br />
          <h3>Add New Song</h3>
          <form method="POST" action={songsLink}>
            <p key="title">Title: <input name="title" required /></p>
            <p key="album">Album: <input name="album" required /></p>
            <p key="preview_link">Preview Link: <input name="preview_link" required /></p>
            <p key="artwork">Artwork: <input name="artwork" required /></p>
            <p key="artists"> Artists: <select name="artist_id">
                {artistsOptionsElements}
            </select> </p>
            <p><input type="submit" /></p>
          </form>
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

module.exports = NewSong;
