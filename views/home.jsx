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
        </body>
      </html>
    );
  }
}

module.exports = Home;