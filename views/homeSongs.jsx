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
        <head>
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <h1>Songs</h1>
          <a href="/artists/"><button>Browse by artist instead</button></a>
          <a href="/songs/new"><button>Add a new song</button></a>

          <ul>
          {songHTML}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = HomeSongs;