var React = require("react");

class ArtistSongs extends React.Component {
  render() {
    console.log('artist-songs.jsx')
    let artistData = this.props.artist.rows[0];
    let songsData = this.props.songs.rows;
    console.log(artistData);
    console.log(songsData);

    //link to Home Page
    let homeLink = "/"

    //link to Artist Page
    let allArtistsLink = "/artists"

    //link to edit Artist
    const artistEditLink = "/artists/" + artistData.id + "/edit";

    const artistDeleteLink = "/artists/" + artistData.id + "?_method=delete";

    const addSongLink = "/artists/" + artistData.id + "/songs/new";

    // const artistSongsLink = "/artists/" + artistData.id + "/songs"

    const artistSongsList = songsData.map((artistSong) => {
        return <li key={artistSong.id}>
            <a href ={"/songs/"+artistSong.id}><strong>{artistSong.title}</strong></a>
            <ul>
                <li>{artistSong.album}</li>
                <li>{artistSong.preview_link}</li>
                <li>{artistSong.artwork}</li>
            </ul>
        </li>
    });

    return (
      <html>
        <head>
        </head>
        <body margin-left="20px">
            <p><a href={homeLink}>Back to Main</a></p>
            <p><a href={allArtistsLink}>All Artists</a></p>
            <p><a href={artistEditLink}>Edit Artist Profile</a></p>
            <h3>Artist</h3>
            <p>Name: {artistData.name}</p>
            <p>Photo url: {artistData.photo_url}</p>
            <p>Nationality: {artistData.nationality}</p>
            <h4>All Songs <a href={addSongLink}> + Add Song</a></h4>
            <ol>{artistSongsList}</ol>
            <br/>
            <br/>
        </body>
      </html>
    );
  }
}
module.exports = ArtistSongs;