var React = require("react");
var Layout = require("./layout");

class EditArtist extends React.Component {
  render() {
    return (
      <Layout>
          <h3>Form Goes Here!</h3>
          <form method="POST" action="/artist/edit?_method=PUT">
            <input type="text" name="id" value={this.props.id} readOnly/>
            <input type="text" name="name" value={this.props.name}/>
            <input type="text" name="photo_url" value={this.props.photo_url}/>
            <input type="text" name="nationality" value={this.props.nationality}/>
            <input type="submit" value="Edit Artist"/>
          </form>
      </Layout>
    );
  }
}

module.exports = EditArtist;