var React = require("react");

class Newsong extends React.Component {
  render() {
    // CSS stuff

    // Javascript stuff
    // Would be good if can incorporate autocomplete form for songs from the database
    const playlistDetails = this.props.playlistDetails[0];

    const playlistID = playlistDetails.id;

    const url = `/playlist/${playlistID}`;

    const allSongs = this.props.songList;

    const allSongTitle = allSongs.map(el => {
      return <option value={el.id}>{el.title}</option>
    })

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"/>
        </head>
        <body>
          <h1>Add New Song</h1>
          <div>
            <form action={url} method="post">
              <input type="text" name="title" placeholder="title"></input><br></br>
              <input type="text" name="artist" placeholder="artist"></input><br></br>
              <input type="text" name="album" placeholder="album"></input><br></br>
              <input type="text" name="preview_link" placeholder="audio preview link"></input><br></br>
              <input type="text" name="artwork" placeholder="artwork"></input><br></br>
              <input type="submit" value="Add Song!"></input>
            </form>
          </div>

          <div>
          <h2>Select from database</h2>
          <form action={url} method="get">
            <select className="selectpicker my-4" data-live-search="true">
              {allSongTitle}
            </select>
            <input type="submit" value="Add Song!"></input>
          </form>
          </div>

          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Newsong;