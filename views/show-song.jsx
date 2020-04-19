var React = require("react");

class ShowSong extends React.Component {
  render() {
        // console.log('show-artist.jsx')
        let songData = this.props.rows[0];
        // let songsData = this.props.songs;
        // console.log(songData.id);

        //link to Home Page
        let homeLink = "/"

        //link to Artist Page
        let allSongsLink = "/songs"

        //link to edit Artist
        const songEditLink = "/songs/" + songData.id + "/edit";

        const songDeleteLink = "/songs/" + songData.id + "?_method=delete";

    return (
      <html>
        <head />
        <body>
            <p><a href={homeLink}>Back to Main</a></p>
            <p><a href={allSongsLink}>All Songs</a></p>
            <p><a href={songEditLink}>Edit Song Profile</a></p>
            <h3>Artist</h3>
            <p>Title: {songData.title}</p>
            <p>Album: {songData.album}</p>
            <p>Preview Link: {songData.preview_link}</p>
            <p>Artwork: {songData.artwork}</p>
            <p>Artist Id: {songData.artist_id}</p>
            <br/>
            <form method="POST" action={songDeleteLink}>
                <input type="submit" value="delete Artist"/>
            </form>

        </body>
      </html>
    );
  }
};

module.exports = ShowSong;