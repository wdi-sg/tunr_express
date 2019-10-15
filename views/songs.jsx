var React = require("react");


class Song extends React.Component {
  render() {

    const songs = this.props.songs.map((song,i)=>{
           return <li key = {i}> {song.title}, {song.album} </li>
        })



    return (
      <html>

        <body>
          <h1>Songs by {this.props.name}</h1>


          <ul>Songs:
            {songs}

          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Song;