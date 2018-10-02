var React = require("react");

class New extends React.Component {
  render() {

    return (
        <html>
      <div>
        <h1>Add new artist</h1>
        <form action="/artists" method="POST">
        <p>name</p>
            <input type="text" name="name" />
        <p>nationality</p>
            <input type="text" name="nationality" />
            <input type="submit"/>
        </form>
      </div>
      </html>
    );
  }
}



module.exports = New;
