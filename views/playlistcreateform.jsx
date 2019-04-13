var React = require("react");
var Layout = require("./layout");

class Playlistcreateform extends React.Component {
  render() {

    return (
        <Layout>
            <h3>Add new playlist:</h3>
                <form method="POST" action="/playlist">
                    Playlist Name: <br/>
                        <textarea name="name" cols="40" rows="10" value="e.g. My Playlist"></textarea><br/>
                    <input type="submit" value="Add New Playlist"/>
                </form>
        </Layout>
    );
  }
}

module.exports = Playlistcreateform;