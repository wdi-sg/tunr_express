var React = require('react');
class Favoritesnew extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Favorite a song</h1>
          </div>
          <div>
            <div>
              <form method="POST" action="/favorites">
                <div>
                  Song ID:
                  <input type="text" name="songid"></input>
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

module.exports = Favoritesnew;