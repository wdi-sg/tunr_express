var React = require("react");

class Artist extends React.Component {
  render() {

    let artist = this.props.artist;

    let editUrl = "/artist/" + artist.id + "/edit";
    let deleteUrl = "/artist/" + artist.id + "/?_method=delete";
    let addSongUrl = "/artist/" + artist.id + "/song/new";

    return (
          <html>
            <body>

              <h1>Artist Name: {artist.name}</h1>

              <img src={artist.photo_url}/>

              <h3>Artist Nationality: {artist.nationality}</h3>

              <form action = {editUrl}>
                <input type = "submit" value = "Edit"/>
              </form>

              <form action = {deleteUrl}>
                <input type = "submit" value = "Delete"/>
              </form>

              <form action = {addSongUrl}>
                <input type = "submit" value = "Add Song"/>
              </form>

            </body>
          </html>
    );
  }
}

module.exports = Artist;