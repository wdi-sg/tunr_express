var React = require("react");
var Layout = require('./layout');
class Home extends React.Component {
  render() {

    console.log("THIS IS MY HOME PAGE");
    console.log(this.props);
    var playArr = this.props.playlist[0];
    var songsArr = this.props.songs;
    var index = "/playlist/"+ playArr.id +"/newsong";

    var listSong = songsArr.map((item)=>{
        return(
        <li class="list-group-item">{item.title}</li>
        )
    })

    return (
        <Layout>
          <h1 class = "text-center">This is your playlist</h1>
          <div class = "container-fluid">
             <h1 class ="display-1 text-center">{playArr.name}</h1>
             <a href= {index} class="list-group-item list-group-item-action disabled">Add Song</a>
             <div class = "container">
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