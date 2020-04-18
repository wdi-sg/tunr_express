var React = require('react');
class Playlistnew extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Add a new playlist</h1>
          </div>
          <div>
            <div>
              <form method="POST" action="/playlisthome">
                <div>
                  Name:
                  <input type="text" name="name"></input>
                </div>
                <div>
                  <input type="submit" value="submit"></input>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlistnew;