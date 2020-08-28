var React = require("react");

class Home extends React.Component {
  render() {
        let allArtists = this.props.rows
        let artistHTML = allArtists.map((item)=>{
            let artistURL = "/artists/" + item.id
            return <li><a href={artistURL}>{item.name}</a></li>
        })

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <h1>Artists</h1>
          <a href="/songs/"><button>Browse by song instead</button></a>
          <a href="/artists/new"><button>Add a new artist</button></a>
          <ul>
          {artistHTML}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = Home;