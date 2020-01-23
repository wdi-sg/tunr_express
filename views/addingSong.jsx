var React = require("react");
var Layout = require('./layout');

class Home extends React.Component {
  render() {
    console.log("THIS IS ADD SONG PAGE");
    // console.log(this.props);
    var songsArr = this.props.songs;
    var actionLink = "/playlist/" + this.props.index +"/newsong";
    var backPlaylist = "/playlist/" + this.props.index
    var options = songsArr.map((item)=>{
        return(
                <option value={item.id}>{item.title}</option>
        )
    });
    return (
        <Layout>
          <h1>Add Song!</h1>
          <form action = {actionLink} method = "POST">
            <div class="form-group">
                <label for="exampleFormControlSelect1">Songs</label>
                <select class="form-control" name="songs">
                {options}
                </select>
                <input class="btn btn-secondary btn-lg" type="submit" value="Submit"/>
              </div>
              <a href= {backPlaylist} class="list-group-item list-group-item-action disabled">Back to Playlist</a>
            </form>
        </Layout>
    );
  }
}

module.exports = Home;