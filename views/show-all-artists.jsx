var React = require("react");

class ShowAllArtists extends React.Component {
  render() {

    const allArtists = this.props.artists.map((item) =>{
        return <li>{item.name}</li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Artists!</h1>
          <ul>{allArtists}</ul>
        </body>
      </html>
    );
  }
}

module.exports = ShowAllArtists;
