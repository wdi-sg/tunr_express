var React = require("react");

class ShowArtist extends React.Component {
  render() {

    const allSongs = this.props.songs.map((item)=>{

      return <li>{item.title}</li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>{this.props.artistName.name}</h1>
          <h3>Songs</h3>
          <ul>{allSongs}</ul>
        </body>
      </html>
    );
  }
}

module.exports = ShowArtist;
