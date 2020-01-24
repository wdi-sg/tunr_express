var React = require("react");

class Home extends React.Component {
  render() {

    const artistsData = this.props.artistsData

    const artistsList = artistsData.map( artists => {
        return <li>{artists.name}</li>
    });

    return (
      <html>
        <head />
        <body>
            <h1>Welcome!</h1>
            {artistsList}
        </body>
      </html>
    );
  }
}

module.exports = Home;