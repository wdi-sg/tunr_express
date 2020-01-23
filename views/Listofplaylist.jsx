var React = require("react");
var Layout = require('./layout');
class Home extends React.Component {
  render() {
    console.log("THIS IS MY HOME PAGE");
    console.log(this.props);
    var playlistArr = this.props.playlist;

    var links = playlistArr.map((item)=>{
        var items = "/playlist/" + item.id
        return(
            <a href= {items} class="list-group-item list-group-item-action disabled">{item.name}</a>
        )
    });


    return (
        <Layout>
          <h1>All Playlist</h1>
          <div class = "container">
          <div class="list-group">
            {links}
            </div>
          </div>
        </Layout>
    );
  }
}

module.exports = Home;