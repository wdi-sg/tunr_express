var React = require("react");

class Home extends React.Component {
  render() {
        let artists = this.props.artist.map(artist => {
        return <div>
                <p> {artist.name} </p>
                <img src = {artist.photo_url}></img>
                <p>{artist.nationality}</p>
                </div>;})

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <div>{artists}</div>
        </body>
      </html>
    );
  }
}

module.exports = Home;