var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Add Artist</h3>
            <font color="red">{this.props.message}</font>
            <form method="POST" action="/artists/new">
                Name: <input type="text" name="name" required/><br/>
                Photo URL: <input type="url" name="photo_url" required/><br/>
                Nationality: <input type="text" name="nationality" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;