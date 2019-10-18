var React = require("react");

class Newplaylist extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
            <form action="/playlist" method="POST">
                        <p>Name Of Playlist:</p>
                      <input type="text" name="name"/><br/>
                      <input type="submit" value="submit"/>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;