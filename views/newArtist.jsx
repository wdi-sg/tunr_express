var React = require("react");
const Template = require('./template.jsx');

class NewArtist extends React.Component {
  render() {
    return (
      <Template>
      <h1>Add a new artist</h1>
      <form action="/artists/" method="POST">
        <label>Name</label><br/>
        <input type="text" name="name"/><br/><br/>
        <label>Photo URL</label><br/>
        <input type="text" name="photo_url"/><br/><br/>
        <label>Nationality</label><br/>
        <input type="text" name="nationality"/><br/><br/>
        <input type="submit" value="Add Artist"/>
      </form>
      </Template>
    );
  }
}

module.exports = NewArtist;
