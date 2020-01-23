var React = require("react");
var Layout = require('./layout');

class Home extends React.Component {
  render() {
    console.log("THIS IS CREATE PLAYLIST PAGE");

    return (
        <Layout>
          <h1>CREATE A PLAYLIST!</h1>
          <form action = "/playlist/new" method = "POST">
            <div class="form-group">
                <label for="exampleFormControlInput1">Playlist Name</label>
                <input type="text" class="form-control" name="name" placeholder="Playlist Name"/>
                <input class="btn btn-secondary btn-lg" type="submit" value="Submit"/>
              </div>
            </form>
        </Layout>
    );
  }
}

module.exports = Home;