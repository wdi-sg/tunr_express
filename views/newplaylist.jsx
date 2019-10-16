var React = require("react");
var Layout = require('./defaultlayout.jsx');

class New extends React.Component {
  render() {
    return (
      <Layout>
          <h2 class="m-3">New Playlist</h2>
          <form class="m-3" method="POST" action="/playlists">
            Name: <input type="text" name="name" required/><br/>
            <input type="submit" value="Submit"/>
          </form>
      </Layout>
    );
  }
}

module.exports = New;
