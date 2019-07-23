var React = require("react");

class New extends React.Component {
  render() {
    var url = '/homepage'
    return (
      <html>
        <head />
        <body>
            <h1>Add new Artist</h1>
            <form method="POST" action={url}>
                <h2>Name</h2>
                <input type="text" name="name"/>
                <h2>Photo Url</h2>
                <input type="text" name="photo_url"/>
                <h2>nationality</h2>
                <input type="text" name="nationality"/>
                <br />
                <input type="submit"/>
            </form>
            <a href={url}>Home</a>
        </body>
      </html>
    );
  }
}

module.exports = New;