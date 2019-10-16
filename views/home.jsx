var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h1>Welcome!</h1>
            <form method="GET" action="/artists/">
                <p>
                    To see all our artists: <br/>
                    <input type="submit" value="Artists"/>
                </p>
            </form>
            <form method="GET" action="/playlist">
                <p>
                    To see all your playlist: <br/>
                    <input type="submit" value="Playlist"/>
                </p>
            </form>
            <form method="GET" action="/artists/new">
                <p>
                    To add artists: <br/>
                    <input type="submit" value="Add"/>
                </p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;