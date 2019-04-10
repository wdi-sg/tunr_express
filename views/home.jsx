var React = require("react");

class Home extends React.Component {
  render() {

    const artists = this.props.artists.map((artist)=>{
        return <p>{artist.id}) {artist.name}</p>;
    });


    return (
      <html>
        <head />
        <body>
            <h1>Index of artists</h1>
            {artists}
        </body>
      </html>
    );
  }
}

module.exports = Home;