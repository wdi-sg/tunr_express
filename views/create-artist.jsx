var React = require("react");
var Layout = require("./layout");

class CreateArtist extends React.Component {
  render() {
    return (
      <Layout>
          <h3>Form Goes Here!</h3>
          <form className="input-form" method="POST" action="/artist/new">
            <input type="text" name="name" placeholder="Input name"/>
            <input type="text" name="photo_url" placeholder="URL link to photo"/>
            <input type="text" name="nationality" placeholder="Nationality"/>
            <input type="submit" value="Create Artist"/>
          </form>
      </Layout>
    );
  }
}

module.exports = CreateArtist;