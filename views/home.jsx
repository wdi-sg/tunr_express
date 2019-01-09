var React = require("react");

class Home extends React.Component {
  render() {

    let eachArtist = this.props.artists.map(artist => {
      return (<a href={"/artist/" + artist.id}><h5>{artist.name}</h5></a>);
    })

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          {eachArtist}
        </body>
      </html>
    );
  }
}

module.exports = Home;
