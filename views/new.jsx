var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    return (
      <Layout>
          <h1>Add a new artist</h1>
          <div class="artists">
            <form action="/artists" method="POST">
              <div class="form-row">
                <span class="artist-name">Name of Artist:</span><br></br>
                <input class="input-text" type="text" name="name" placeholder="Cardi B"/>
              </div>
              <div class="form-row">
                <span class="artist-name">URL of image:</span><br></br>
                <input class="input-text" type="text" name="url" placeholder="http://imgur.com/iUajnd"/>
              </div>
              <div class="form-row">
                <span class="artist-name">Nationality of Artist:</span><br></br>
                <input class="input-text" type="text" name="nationality" placeholder="Singaporean"/>
              </div>
              <input class="button-submit" type="submit" />
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = New;
