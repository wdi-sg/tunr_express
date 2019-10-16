var React = require("react");
var Layout = require('./defaultlayout.jsx');

class New extends React.Component {
  render() {
    return (
      <Layout>

          <div className="text-center col-12 d-flex flex-wrap justify-content-center">
          <h2 class="m-3 col-12">New Playlist</h2>
          <form class="m-3" method="POST" action="/playlists">
            Name: <input type="text" name="name" required/><br/>
            <input className="m-3" type="submit" value="Submit"/>
          </form>
          </div>

      </Layout>
    );
  }
}

module.exports = New;
