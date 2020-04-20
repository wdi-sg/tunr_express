var React = require("react");

class EditArtist extends React.Component {
  render() {

        // console.log("new-artists.jsx");
        let artistData = this.props.artist;

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        //back to Artist page
        const artistPageLink = "/artists/" + artistData.id

        // link to reset Artist
        const artistEditLink = "/artists/" + artistData.id+ "/edit";
        // link to edit query link (PUT) action for submit
        const artistLink = '/artists/'+ artistData.id + "?_method=put";

        //Form Items
        const artistsKeys = ['Name', 'Photo_url', 'Nationality'];
        const artistFormInput = artistsKeys.map((artistsKey) => {
            return <p key={artistsKey}>{artistsKey}: <input name= {artistsKey.toLowerCase()} defaultValue={artistData[artistsKey.toLowerCase()]}/></p>;
        });



    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css" />
      </head>
        <body>
            <p><a href={artistLink}>Back to Artist Page</a></p>
            <p><a href={artistEditLink}>Reset</a></p>
            <h3>Add New Artist</h3>
            <form action={artistLink} method="POST">
                {artistFormInput}
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

module.exports = EditArtist;
