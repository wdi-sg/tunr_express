var React = require("react");

class Home extends React.Component {
  render() {
    const counter = this.props.counter;

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <footer style={{"position": "absolute", "bottom": "0", "left": "0", "textAlign": "center", "width": "100%"}}>
            <p style={{"display": "inline-block", "fontSize": "28px"}}>View count: {counter}</p>
          </footer>
          <script>var counter = `{counter}`;</script>
          <script src='/script.js'></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;