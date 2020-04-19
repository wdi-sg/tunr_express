var React = require("react");

class Singleartist extends React.Component {
  render() {
    //CSS stuff
    const imageStyle = {
                    "max-width" : "500px",
                    "max-height" : "500px"
                }

    //Javascript stuff

    ///////Artist stuff
    const artist = this.props.artistDetails[0];

    const artistName = artist.name;

    const artistImage = <img src={artist.photo_url} style={imageStyle}></img>

    const artistNationality = <p>Nationality: {artist.nationality}</p>

    ////////Song stuff
    const artistSongs = this.props.allSongDetails;

    const showSongs = artistSongs.map((el, i) => {

      return (
        <tr>
          <th scope="row">{i}</th>
          <th scope="row">{el.title}</th>
          <th scope="row">{el.album}</th>
          <th scope="row">
                      <audio controls>
                        <source src={el.preview_link} type="audio/mp3"></source>
                        Your browser does not support the audio element.
                      </audio>
          </th>
        </tr>
        )
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        </head>
        <body>
          <h1>{artistName}</h1>
          <div>
            {artistImage}
          </div>
          <div>
            {artistNationality}
          </div>
          <div>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Album</th>
                  <th scope="col">Preview</th>
                </tr>
              </thead>
                {showSongs}
              <tbody>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Singleartist;