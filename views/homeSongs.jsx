var React = require("react");

class HomeSongs extends React.Component {
  render() {
        let allSongs = this.props.rows
        let songHTML = allSongs.map((item)=>{
            let songURL = "/songs/" + item.id
            return <a href={songURL}><li>{item.title}</li></a>
        })

    return (
      <html>
        <head />
        <body>
          <h1>Songs</h1>
          <a href="/artists/"><button>Browse by artist instead.</button></a>
          <ul>
          {songHTML}
          </ul>

          <br/><br/>
          <a href="/songs/new"><button>Add a new song</button></a>
        </body>
      </html>
    );
  }
}

module.exports = HomeSongs;