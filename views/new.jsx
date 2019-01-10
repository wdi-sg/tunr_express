var React = require("react");
var DefaultLayout = require ('./default');

class New extends React.Component {
  render() {
    return (
    <DefaultLayout>
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
        </body>
      </html>
      </DefaultLayout>
    );
  }
}

module.exports = New;