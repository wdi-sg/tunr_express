var React = require("react");
var Layout = require("./layout");

class Dummy extends React.Component {
  render() {
    return (<Layout>
      <html>
        <head />
        <body>
          <h3>Welcome! Hello World!</h3>
        </body>
      </html>
    </Layout>);
  }
}

module.exports = Dummy;
