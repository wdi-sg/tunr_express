var React = require("react");

class Home extends React.Component {
  render() {
    const artistsNameList = this.props.rows.map((artist) => {
        return <li><a href={'/artists/'+artist.id}>{artist.name}</a></li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <ul>{artistsNameList}</ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
