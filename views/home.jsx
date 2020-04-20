var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this.props.badge)
    return (

      <html>
        <head />
        <body>
          <h1>Hello World!!!</h1>
          <h2>Welcome to Tunr!!</h2>
          <p>Number of visits:</p>
          <p>{this.props.badge}</p>

        </body>
      </html>
    );
  }
}

module.exports = Home;