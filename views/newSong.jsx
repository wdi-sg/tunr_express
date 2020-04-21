var React = require("react");

class newSong extends React.Component {
  render() {
        const artistOption=this.props.artist.map(artist=>
        {
            //console.log(song);
            return <option value={artist.id}>{artist.name}</option>


        });
    return (
      <html>
        <head />
        <head>
                <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
                </head>
        <body>
        <nav class={"navbar navbar-expand-lg navbar-light bg-light"}>

            <button class={"navbar-toggler"} type={"button"} data-toggle={"collapse"} data-target={"#navbarNavAltMarkup"} aria-controls={"navbarNavAltMarkup"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
            <span class={"navbar-toggler-icon"}></span>
            </button>
            <div class={"collapse navbar-collapse"} id={"navbarNavAltMarkup"}>
                <div class="navbar-nav">
                    <a class={"nav-item nav-link active"} href={"/"}>Home <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/artists">View Artists</a>
                    <a class="nav-item nav-link" href="/artists/new">Add Artist</a>
                    <a class="nav-item nav-link" href="/songs">View Songs</a>
                    <a class="nav-item nav-link" href="/songs/new">Add Artist</a>
                    <a class= "nav-item nav-link" href="/playlist"> View Play list </a>
                    <a class= "nav-item nav-link" href="/playlist/new"> Add New Play list </a>
                </div>
              </div>
        </nav>
          <h3>Form Goes Here!</h3>
            <form method="POST" action="/songs"  style={{textAlign: "Center"}}>
                <span>Name: </span>
                    <input  id= "title" type="text" name="title" placeholder="Enter Title" required
                            oninvalid="this.setCustomValidity('Enter Valid Title Here')"
                            oninput="this.setCustomValidity('')" ></input>
                    <br></br><br></br>

                <span>Album: </span>
                    <input  id= "album" type="text" name="album" placeholder="Enter album" required
                            oninvalid="this.setCustomValidity('Enter Valid album Here')"
                            oninput="this.setCustomValidity('')" ></input>
                    <br></br><br></br>

                <span>Artwork Source: </span>
                    <input type="text" name="img" placeholder="Enter link" required
    oninvalid="this.setCustomValidity('Enter Valid link Here')"
    oninput="this.setCustomValidity('')"></input>
                    <br></br><br></br>

                    <span>Preview Link: </span>
                    <input type="text" name="preview_link" placeholder="Enter Preview Link here" required
    oninvalid="this.setCustomValidity('Enter preview link Here')"
    oninput="this.setCustomValidity('')"></input>

                    <br></br><br></br>

                    <label for="Artist">Choose an artist:</label>
                    <select id="Artist" name="artist_id">
                    {artistOption}
                    </select>

                    <input type="submit" value="Submit"></input>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = newSong;