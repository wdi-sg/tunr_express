var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Add a new artist</h1>
          </div>
          <div>
            <div>
              <form method="POST" action="/artists">
                <div>
                  Name:
                  <input type="text" name="name"></input>
                </div>
                <div>
                  Photo URL:
                  <input type="text" name="photourl"></input>
                </div>
                <div>
                  Nationality:
                  <input type="text" name="nationality"></input>
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

module.exports = New;