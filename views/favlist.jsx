var React = require("react");

class playlist extends React.Component {
  render() {
        //console.log(this.props.playlist[0].id)
    //const link="/artists/"+this.props.artist[0].id+"/songs";
    //const editLink= "/playlist/"+this.props.playlist[0].id+"/edit";
    //const deleteLink = "/artists/"+ this.props.artist[0].id + "?_method=delete";
    const songsList=this.props.songs.map(song=>
        {
            const url="/songs/"+song.id;
            //console.log(song);
            return <div class={"col-6 border mt-3 mb-3"}>
                <span>Title:</span><a href={url}>{song.title}</a>
                <br/>
                <span>Abulm: {song.album}</span>
                <br/>
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
        <div class={"container border mt-5"} style={{width:"50%"}}>
            <div class={"row text-center mt-3 mb-5"}>
                <div class={"col-12 text-center"}>
                <h1> {this.props.userName}'s Favorite</h1>
                </div>

            </div>
            <div class={"row"}>
            {songsList}
            </div>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = playlist;