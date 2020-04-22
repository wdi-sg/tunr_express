var React = require("react");

//home page to include anchor tags w/ reference to corresponding links
console.log("Home Page Accessed");
console.log("------------------");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr!</h1>
        </body>
      </html>
    );
  }
}

module.exports = Home;
