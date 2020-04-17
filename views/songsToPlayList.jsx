var React = require("react");

class songsToPlaylist extends React.Component {
  render() {
    const url= "/playlist/"+this.props.playlist[0].id;
    const songsOption=this.props.song.map(song=>
        {
            //console.log(song);
            return <div>
            <label for={song.id}>{song.title}</label>
            <input type={"checkbox"} id = {song.id} name = "songid" value={song.id}></input>
            </div>

        });

    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"}>
            <div class={"row text-center h-100"}>
                <div class={"col-12 text-center"}>
                    <h1>Playlist Add Songs</h1>
                </div>
            </div>
            <div class={"row text-center h-100"}>
                <div class={"col-4 text-center my-auto"}>
                <h2>Add songs to playlist {this.props.playlist[0].name}</h2>
                </div>

                <div class={"col-8 text-center"}>
                <form method="POST" action={url}  style={{textAlign: "Center"}}>



                         <input name="playlist_id" value={this.props.playlist[0].id} style={{display:"none"}}/>
                    <div style={{overflow:"scroll", height: "400px"}}>
                {songsOption};
                    </div>

                <input type="submit" value="Submit"></input>
                </form>
                </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = songsToPlaylist;