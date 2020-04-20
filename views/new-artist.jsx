var React = require("react");

class NewArtist extends React.Component {
  render() {
        // console.log("new-artists.jsx");

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        //link to Home Page
        let homeLink = "/"

        //link to Artist Page
        let allArtistsLink = "/artists"

        const artistsKeys = ['Name', 'Photo_url', 'Nationality'];
        const formInputArtist = artistsKeys.map((artistsKey) => {
            return <p key={artistsKey}>{artistsKey}: <input name= {artistsKey.toLowerCase()} /></p>;
        });

    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="style.css" />
      </head>
        <body>
            <a href={homeLink}>Back to Main</a>
            <br />
            <br />
            <a href={allArtistsLink}>All Artist</a>
            <br />
            <h3>Add New Artist</h3>
            <form action="/artists" method="POST">
                {formInputArtist}
                <p><input type="submit" /></p>
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

module.exports = NewArtist;
