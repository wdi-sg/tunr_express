var React = require("react");

class Artist extends React.Component {
  render() {

    let artist = this.props.artist;

    let editUrl = "/artist/" + this.props.artistId + "/edit";
    let deleteUrl = "/artist/" + this.props.artistId + "/?_method=DELETE";
    let addSongUrl = "/artist/" + this.props.artistId + "/song/new";

    let songsList = artist.map(song =>{

        // let url = '/artist/'+ songs.id

        return(
                <div className = "songCards">

                    <img src = {song.artwork} className = 'songImg'/>
                    <p>Song's Title: {song.title}</p>
                    <p>Song's Album: {song.album}</p>

                    <audio controls>
                      <source src = {song.preview_link} type="audio/mpeg"/>
                    </audio>

                </div>
        )
    });

    return (
          <html>

            <head>
              <link rel = "stylesheet" type = "text/css" href = "/css/style.css"/>
            </head>

            <body>

              <div className = "artistContainer">

                <div className = "artistDiv">

                  <img className = "artistImage" src = {artist[0].photo_url}/>

                  <h1>Artist Name: {artist[0].name}</h1>

                  <h3>Artist Nationality: {artist[0].nationality}</h3>

                  <form action = {editUrl}>
                    <input type = "submit" value = "Edit Artist"/>
                  </form>

                  <form action = {deleteUrl}>
                    <input type = "submit" value = "Delete Artist"/>
                  </form>

                  <form action = {addSongUrl}>
                    <input type = "submit" value = "Add Artist Song"/>
                  </form>

                  {songsList}

                </div>

              </div>

            </body>
          </html>
    );
  }
}

module.exports = Artist;