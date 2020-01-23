var React = require("react");

class ShowPlaylist extends React.Component {
  render() {

    const allSongs = this.props.songs.map((items) =>{
        return <li>{items.title}</li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>{this.props.playlist}</h1>
          <ul>
            {allSongs}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = ShowPlaylist;
