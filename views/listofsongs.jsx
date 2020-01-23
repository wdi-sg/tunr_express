var React = require("react");
var Layout = require('./layout');


class Home extends React.Component {
  render() {
    console.log("THIS IS MY HOME PAGE");
    console.log(this.props);
    var songsArr = this.props.songs;
    var artistArr = this.props.artist[0];
     var addPath = "/artists/"+ this.props.index +"/songs/new";
    var listSong = songsArr.map((item)=>{
        return(
        <li class="list-group-item">{item.title}</li>
        )
    });


    return (
        <Layout>
          <h1>All Song by {artistArr.name}</h1>
                <div>
                        <a href = {addPath} style = {{color:"white", textDecoration:"none"}}><button type="button" class="btn btn-primary btn-lg btn-block">ADD NEW SONG
                         </button></a>
                    </div>
          <div class = "container">
          <div class="list-group">
          <ul class="list-group">
                  {listSong}
                </ul>
            </div>
          </div>
        </Layout>
    );
  }
}

module.exports = Home;