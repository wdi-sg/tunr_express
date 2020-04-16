var React = require("react");

class artistSong extends React.Component {
  render() {

    const link="/artists/"+this.props.artist[0].id+"/songs";
        const songDetail=this.props.songs.map(songs=>
        {
            return <div class={"col-6 text-center border"}>
            <div class={"row"} style={{height:"30%"}}>
            <div class={"col-12"}>
            <img style={{width: "100%", maxHeight:"70%"}} src={songs.artwork}></img>
            </div>
            </div>
            <div class={"row align-bottom"}>
            <div class={"col-12"}>
            <p>Title: {songs.title}</p>
            <p>Album: {songs.album}</p>
            </div>
            </div>
            </div>
        });
    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"} style={{width:"100%"}}>
            <div class={"row text-center mt-3"}>
                <div class={"col-4 text-center"}>
                    <div class={"row"}>
                        <div class={"col-12 text-center"}>
                            <h1>Artist: {this.props.artist[0].name}</h1>
                        </div>
                    </div>
                    <div class={"row"}>
                        <div class={"col-12 text-center"}>
                            <img src={this.props.artist[0].photo_url}  style={{width:"100%"}}></img>
                        </div>
                    </div>
                </div>

                <div class={"col-8"}>
                    <div class={"row"}>
                            {songDetail};
                    </div>
                </div>

            </div>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = artistSong;