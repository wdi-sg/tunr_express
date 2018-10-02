var React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>New Artist</h1>
        <form action="/new" method="POST">
        <p>name</p>
          <input type="text" name="name" />
        <p>nationality</p>
        <input type="text" name="nationality"/>
        <p>photo_url</p>
          <input type="image" name="photo_url"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = New;

