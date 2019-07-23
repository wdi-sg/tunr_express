var React = require("react");


//this is the overall style of all subsequent pages for the user to navigate
class Layout extends React.Component {
  render() {
    return (
      <html>
      <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <head>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = Layout;
