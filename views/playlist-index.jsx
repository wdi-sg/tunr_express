var React = require("react");

class PlaylistIndex extends React.Component {
  render() {


const playlistIndex = this.props.playlists.map((playlist, index)=> {
    const link = '/playlists/' + (index + 1);
    return <li><a href={link}>{playlist.name}</a></li>
})



    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      </head>
        <body>
          <div>
          <h1> List of Playlists </h1>
          <ol>
          {playlistIndex}
          </ol>
          </div>
          <footer className="home-footer">
            <p> No of visits: {this.props.cookieCount}</p>
        </footer>
        </body>
      </html>
    )
  }
}

module.exports = PlaylistIndex;