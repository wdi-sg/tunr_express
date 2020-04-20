var React = require("react");

class List extends React.Component {
  render() {
    let songs = '/playlists/' + this.props.id + '/newsong';
    // let formEdit = '/artists/' + this.props.id + '/edit';
    // let formDelete = '/artists/' + this.props.id + '?_method=delete';
    console.log(this.props.songs);
    let name = this.props.songs[0].name;
    let list = this.props.songs.map(song => {
        return ( <li>{song.title}</li> );
    })
    return (
      <html>
        <head />
        <body>
            <h1>{name}</h1>
            <ul>{list}</ul>
            <form method="GET" action={songs}>
              <input type="submit" value="Add song"/>
            </form>
            <p><a href="http://localhost:3000/playlists" alt="homepage">Back to Playlists</a></p>
        </body>
      </html>
    );
  }
}

module.exports = List;