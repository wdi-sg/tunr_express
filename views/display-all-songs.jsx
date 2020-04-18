var React = require("react");
var DisplayOneSongMod= require("./display-one-song-mod");

class DisplayAllSongs extends React.Component {
  render() {
    
    let artist = this.props.artist;

    let songs = this.props.songs.map((element) => {
      return <DisplayOneSongMod song={element} />;
    });

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <div className="container">
            <div className="row">
              <div className="col mt-5">
                <h3><u>Songs By {artist}</u></h3>
                <br></br>
                {songs}
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DisplayAllSongs;
