var React = require("react");

class Home extends React.Component {
  render() {
    let listOfArtists = this.props.artists.map(item => {
      return <li>{item}</li>
    });
    return (
      <html>
        <head />
        <body>
          <h1>Here is your list of artists:</h1>
          <ul>{listOfArtists}</ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
