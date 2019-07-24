var React = require("react");
var Layout = require("./component/layout-allpage.jsx");


class Home extends React.Component {
  render() {
    //code goes here
    var createPlaylist =
    <form action="/playlist" method="post">
    <label>Create new playlist</label><br/><br/>
    <input name="playlist_name" type="text" placeholder="Playlist name"/><br/><br/>
    <input type="submit" value="Create playlist"/>
    </form>

    //user will put content in here. content will differ from page to page
    return (
      <Layout>
        <div id="artist-holding-page">
          {createPlaylist}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;
