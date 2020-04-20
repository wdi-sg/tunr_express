var React = require("react");

class EditSong extends React.Component {
  render() {

        // console.log("new-songs.jsx");
        let artistsData = this.props.artist
        console.log(artistsData);
        let songData = this.props.song;

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        //back to Songs page
        const songPageLink = "/songs/" + songData.id

        // link to reset Artist
        const songEditLink = "/songs/" + songData.id+ "/edit";
        // link to edit query link (PUT) action for submit
        const songLink = '/songs/'+ songData.id + "?_method=put";

        //Form Items
        // const songsKeys = ['Title', 'Album', 'Preview_link', 'Artwork', 'Artist_id'];
        // const songFormInput = songsKeys.map((songsKey) => {
        //     return <p key={songsKey}>{songsKey}: <input name= {songsKey.toLowerCase()} defaultValue={songData[songsKey.toLowerCase()]}/></p>;
        // });

        const artistsOptionsElements = artistsData.map((artist) => {
            if(artist.id === songData.artist_id) {
                return <option key={artist.id} value={artist.id} selected>{artist.name}</option>
            } else {
                return <option key={artist.id} value={artist.id}>{artist.name}</option>
            }
        })



    return (
      <html>
        <head />
        <body>
            <p><a href={songLink}>Back to Song Page</a></p>
            <p><a href={songEditLink}>Reset</a></p>
            <h3>Edit Song</h3>
            <form action={songLink} method="POST">
                <p key="title">Title: <input name="title" defaultValue={songData.title} /></p>
                <p key="album">Album: <input name="album" defaultValue={songData.album} required /></p>
                <p key="preview_link">Preview Link: <input name="preview_link" defaultValue={songData.preview_link} required /></p>
                <p key="artwork">Artwork: <input name="artwork" defaultValue={songData.artwork} required /></p>
                <p key="artists"> Artists: <select name="artist_id">
                {artistsOptionsElements}
                </select> </p>
                <p><input type="submit" /></p>
            </form>

            <div>
                <p>Visits: {cookiesVisits}</p>
            </div>
        </body>
      </html>
    );
  }
};

module.exports = EditSong;
