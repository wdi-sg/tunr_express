var React = require("react");

class NewSongTArtist extends React.Component {
  render() {
        console.log("new-song.jsx");
        // console.log(this.props.rows)
        let artistData = this.props.artist.rows[0];
        let songsLink = "/artists/"+artistData.id+"/songs";

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        const songsKeys = ['Title', 'Album', 'Preview_link', 'Artwork'];
        const formInputSong = songsKeys.map((songsKey) => {
            return <p key={songsKey}>{songsKey}: <input name= {songsKey.toLowerCase()} required/></p>
        });


    return (
      <html>
        <head />
        <body>
          <h3>Add New Song to Artist</h3>
          <h4>Artist Id: {artistData.id} </h4>
          <h4>Artist Name: {artistData.name} </h4>
          <form method="POST" action={songsLink}>
            {formInputSong}
            <p><input name="artist_id" type="hidden" value={artistData.id} readOnly/></p>
            <p><input type="submit" /></p>
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

module.exports = NewSongTArtist;
