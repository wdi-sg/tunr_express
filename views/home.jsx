var React = require("react");
class Home extends React.Component {

  render() {
    //console.log(this.props.artists)
    const artistNames = this.props.artists.map((artist)=>{
      return <li><a href = {`artists/${artist.id}`}>{artist.name}</a></li>
    });
    return (
      <html>
        <head />
        <body>
          <h1>All Artists:</h1>
          <p>{artistNames}</p>
          <p>Total Visits to site: {this.props.num}</p>
        </body>
      </html>
    );
  }
}

module.exports = Home;
