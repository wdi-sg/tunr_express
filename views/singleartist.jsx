var React = require("react");

class Singleartist extends React.Component {
  render() {
    //CSS stuff
    const imageStyle = {
                    "max-width" : "500px",
                    "max-height" : "500px",
                    "display" : "inline"
                }

    const background = {
                        "background" : "rgb(38, 38, 38)"
                    };

    const title = {
                    "color" : "white"
                }

    const nationalityStyle = {
                                "color" : "white"
                            };

    const newSongDiv = {
                            "display" : "inline",
                            "float" : "right",
                            "fontSize" : "76px",
                            "display" : "inline",
                            "position" : "relative",
                            "top" : "270px",
                            "right" : "40px"
                        };

    const newSongStyle = {
                            "color" : "white",
                            "textDecoration" : "none"
                        }

    //Javascript stuff

    ///////Artist stuff
    const artist = this.props.artistDetails[0];

    const artistName = artist.name;

    const artistImage = <img src={artist.photo_url} style={imageStyle}></img>

    const artistNationality = <p>{artist.nationality}</p>

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

    const newSongURL = `/artists/${artist.id}/songs/new`

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        </head>
        <body style={background}>
          <h1 style={title}>{artistName}</h1>
          <div style={imageStyle}>
            {artistImage}
          </div>
          <div style={newSongDiv}>
            <a href={newSongURL} style={newSongStyle}>+</a>
          </div>
          <div style={nationalityStyle}>
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