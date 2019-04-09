var React = require("react");
var Layout = require("./layout");

class Home extends React.Component {
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

module.exports = Home;
