var React = require("react");
var Reuse = require("./reuse");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <Reuse/>
          <h1>Welcome!</h1>
        </body>
      </html>
    );
  }
}

module.exports = Home;
