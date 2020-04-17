var React = require("react");

class artist extends React.Component {
  render() {

    //const link="/artists/"+this.props.artist[0].id+"/songs";
    //const editLink= "/artists/"+this.props.artist[0].id+"/edit";
    //const deleteLink = "/artists/"+ this.props.artist[0].id + "?_method=delete";
    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"} style={{width:"50%"}}>
            <div class={"row text-center mt-3"}>
                <div class={"col-12 text-center"}>
                <h1>Playlist name: {this.props.playlist[0].name}</h1>
                </div>
            </div>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = artist;