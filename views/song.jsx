var React = require("react");

class song extends React.Component {
  render() {

    const link="/artists/"+this.props.song[0].artist_id;
    const editLink= "/songs/"+this.props.song[0].id+"/edit";
    const deleteLink = "/songs/"+ this.props.song[0].id + "?_method=delete";
    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"} style={{width:"50%"}}>
            <div class={"row text-center mt-3"}>
                <div class={"col-12 text-center"}>
                <h1>Title: {this.props.song[0].title}</h1>
                </div>
            </div>
            <div class="row">
                <div class={"col-12 text-center"}>
                    <img src={this.props.song[0].artwork}  style={{width:"90%"}}></img>
                </div>
            </div>

            <div class="row">
                <div class={"col-12 text-center"}>
                    <h2>Album: {this.props.song[0].album}</h2>
                </div>
            </div>

            <div class="row">
                <div class={"col-12 text-center"}>
                    <h2>Preview(Try later): {this.props.song[0].preview_link}</h2>
                </div>
            </div>

            <div class="row">
                <div class={"col-12 text-center"}>
                    <h2><a href={link}>Link to Artist( Partial working)</a></h2>
                </div>
            </div>
            <div class="row">
                <div class={"col-6 border text-center p-0 ml-0"} style={{marginLeft:"0", padding:"0", backgroundColor:"#7C8F8E"}}>
                          <form method="POST" action={deleteLink}>
                    <input  style={{fontSize:"40px", color:"white", backgroundColor:"#7C8F8E", borderColor:"#7C8F8E", width:"95%", marginTop:"10px"}} type="submit" value="Delete"/>
                 </form>
                </div>

                <div style={{backgroundColor:"#7C8F8E"}} class={"col-6 border text-center p-3"}>
                        <a style={{fontSize:"40px", color:"white"}} href={editLink}>Edit</a>
                    </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = song;