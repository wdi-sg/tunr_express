var React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>New Artist</h1>
        <form action="/" method="POST">
        <p>name</p>
          <input type="text" name="name"/>
        <p>nationality</p>
        <input type="text" name="nationality"/>
        <p>photo url</p>
          <input type="text" name="photo_url"/>
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = New;

