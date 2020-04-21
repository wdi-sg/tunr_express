var React = require("react");

class Addsong extends React.Component {
  render() {
    // CSS stuff

    // Javascript stuff
    // Would be good if can incorporate autocomplete form for songs from the database

    let visits = this.props.visits;

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

    // Get details of playlist that song is added to
    const playlistDetails = this.props.playlistDetails[0];

    const playlistID = playlistDetails.id;

    const url = `/playlist/${playlistID}`;

    // Get details of song options that user can choose from
    const allSongs = this.props.songsDetails;

    // Get details of artist options that are linked to the songs
    const allArtists = this.props.artistsDetails;

    // function to get title of artist with artist id
    const getArtistTitle = (artist_id) => {
      for (let i=0; i<allArtists.length; i++){
        if(allArtists[i].id === artist_id){
          return allArtists[i].name;
        }
      }
    }

    const allSongTitle = allSongs.map(el => {
      return <option value={el.id}>{el.title} -{getArtistTitle(el.artist_id)}</option>
    })

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"/>
          <link rel="stylesheet" href="/css/addsong.css"/>
        </head>
        <body>
          <h1>Add New Song</h1>
          <div className="visits">
            {visitbadge}
          </div>
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
            <form action={url} method="post">
              <select className="selectpicker my-4" data-live-search="true" name="song">
                {allSongTitle}
              </select>
              <input className="my-4" type="submit" value="Add Song!"></input>
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

module.exports = Addsong;