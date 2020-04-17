var React = require("react");

class playlist extends React.Component {
  render() {
        console.log(this.props.playlist[0].id)
    //const link="/artists/"+this.props.artist[0].id+"/songs";
    const editLink= "/playlist/"+this.props.playlist[0].id+"/edit";
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
        <div class={"container border mt-5"} style={{width:"50%"}}>
            <div class={"row text-center mt-3 mb-5"}>
                <div class={"col-12 text-center"}>
                <h1>Playlist name: {this.props.playlist[0].name}</h1>
                </div>

            </div>
            <div class={"row"}>
            {songsList}
            </div>
            <div class={"row"}>
            <div class={"col-12 mh-auto"}>
                <form method="Get" action={editLink}  style={{textAlign: "Center"}}>


                        <span>Click to Edit</span>

                    <input type="submit" value="Edit"></input>
                </form>
                </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = playlist;