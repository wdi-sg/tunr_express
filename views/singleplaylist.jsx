var React = require("react");

class Singleplaylist extends React.Component {
  render() {
    // CSS stuff


    // Javascript stuff
    const visits = this.props.visits;

    let visitbadge;

    if(visits < 5){
        visitbadge = <figure>
                        <img src="/newbie_badge.jpg"></img>
                        <figcaption>Visits: {visits}</figcaption>
                    </figure>
    } else if (visits > 4 && visits < 10) {
        visitbadge = <figure>
                        <img src="/silver_badge.svg"></img>
                        <figcaption>Visits: {visits}</figcaption>
                    </figure>
    } else if (visits > 9){
        visitbadge = <figure>
                        <img src="/gold_badge.svg"></img>
                        <figcaption>Visits: {visits}</figcaption>
                    </figure>
    }

    const playlistDetails = this.props.playlistDetails[0];

    const playlistName = playlistDetails.playlist_name;

    const playlistID = playlistDetails.id;

    const newSongURL = `/playlist/${playlistID}/newsong`;

    const playlistSongs = this.props.playlistSongs;

    const showSongs = playlistSongs.map((el, i) => {

      return (
        <tr>
          <th scope="row">{i}</th>
          <th scope="row">{el.title}</th>
          <th scope="row">{el.name}</th>
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
          <link rel="stylesheet" href="/css/singleplaylist.css"/>
        </head>
        <body>
          <div>
            <div>
            <h1>{playlistName}</h1>
            </div>
            <div className="visits">
                {visitbadge}
            </div>
            <div>
                <a href={newSongURL}>+</a>
            </div>
          </div>
          <div>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Artist</th>
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

module.exports = Singleplaylist;