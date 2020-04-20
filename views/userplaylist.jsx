var React = require('react');

class UserPlaylist extends React.Component {
  render() {
    let songListElements;
    if (this.props.songArray.length){
        songListElements = this.props.songArray.map(song => {
            return <li>{song}</li>
        })
    } else {
        songListElements = "None"
    }

    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1>User Playlist</h1>
          <br></br>
          </div>
          <div>
            <ul>{songListElements}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = UserPlaylist;