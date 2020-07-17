const React = require("react");

class AddArtist extends React.Component {
  render() {
    return (
      <div>
        <h1>add a new artist</h1>
        <form action="/artists" method="POST">
            <input type="text" name="name" placeholder="enter name"/><br/>
            <input type="text" name="nationality" placeholder="enter nationality"/><br/>
            <input type="text" name="photo_url" placeholder="enter photo url"/><br/>
            <input type="submit" value="add artist"/>
        </form>
        <a href="/artists/">return to main</a>
      </div>
    );
  }
}

module.exports = AddArtist;
