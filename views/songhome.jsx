var React = require("react");

class SongHome extends React.Component {
  render() {

    const songDetail=this.props.songs.map(song=>
        {
            const url="/songs/"+song.id;
            return <div class={"col-4 text-center border"}>
            <div class={"row"} style={{height:"50%"}}>
            <div class={"col-12"}>
            <img style={{width: "100%", height:"400px"}} src={song.artwork}></img>
            </div>
            </div>
            <div class={"row align-bottom mt-5"}>
            <div class={"col-12 mt-5"}>
            <p  class={"mt-3"}>Title: <a href={url}>{song.title}</a></p>
            <p>Album: {song.album}</p>
            </div>
            </div>
            </div>
        });

    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
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
        <div class={"container border mt-5"}>
            <div class={"row text-center mt-3"}>
                <div class={"col-12 text-center"}>
                <h1>Tower Record</h1>
                </div>
            </div>
            <div class="row">
                {songDetail}
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SongHome;