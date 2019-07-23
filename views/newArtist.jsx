var React = require("react");

class NewArtist extends React.Component {
  render() {
    return (

      <form action="/artists/" method="POST">
        <label>Name</label><br/>
        <input type="text" name="name"/><br/><br/>
        <label>Photo URL</label><br/>
        <input type="text" name="photo_url"/><br/><br/>
        <label>Nationality</label><br/>
        <input type="text" name="nationality"/><br/><br/>
        <input type="submit" value="Add Artist"/>
      </form>

    );
  }
}

module.exports = NewArtist;
