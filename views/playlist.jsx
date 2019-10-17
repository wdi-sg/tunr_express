var React = require("react");

class Playlist extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
            <form action="/playlist" method="POST">
                        <p>Name Of Playlist:</p>
                      <input type="text" name="name"/><br/>
                        <p>URL Of Photo:</p>
                      <input type="text" name="photo_url"/><br/>
                        <p>Nationality:</p>
                      <input type="text" name="nationality"/><br/>
                      <input type="submit" value="Submit" placeholder="Search!!"/>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;
