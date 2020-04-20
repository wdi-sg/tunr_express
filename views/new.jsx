var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add a new artist...</h3>
          <form action="/artists" method="POST">
            <input type="text" name="name" placeholder="Name" />
            <br />
            <input type="text" name="photo_url" placeholder="Photo URL" />
            <br />
            <input type="text" name="nationality" placeholder="Nationality" />
            <br />
            <button type="submit">Add Artist</button>
          </form>
          <footer>Number of visits: {this.props.counter}</footer>
        </body>
      </html>
    );
  }
}

module.exports = New;
