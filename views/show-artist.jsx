var React = require("react");

class ShowArtist extends React.Component {
  render() {
        // console.log('show-artist.jsx')
        let artistData = this.props.artist;
        // console.log(artistData.id);

        //link to Home Page
        let homeLink = "/"

        //link to Artist Page
        let allArtistsLink = "/artists"

        //link to edit Artist
        const artistEditLink = "/artists/" + artistData.id + "/edit";

        const artistDeleteLink = "/artists/" + artistData.id + "?_method=delete";

    return (
      <html>
        <head />
        <body>
            <p><a href={homeLink}>Back to Main</a></p>
            <p><a href={allArtistsLink}>All Artists</a></p>
            <p><a href={artistEditLink}>Edit Artist Profile</a></p>
            <h3>Artist</h3>
            <p>Name: {artistData.name}</p>
            <p>Photo url: {artistData.photo_url}</p>
            <p>Nationality: {artistData.nationality}</p>
            <br/>
            <br/>
            <form method="POST" action={artistDeleteLink}>
                <input type="submit" value="delete Artist"/>
            </form>

        </body>
      </html>
    );
  }
};

module.exports = ShowArtist;