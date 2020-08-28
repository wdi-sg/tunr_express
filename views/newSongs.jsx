var React = require("react");

class NewSongs extends React.Component {
  render() {
    let artists = this.props.rows
    let artistOptionHTML = artists.map((item)=>{
        return <option value={item.id}>{item.name}</option>
    })
    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <h1>Add a new song</h1>
          <form method="POST" action="/songs">
          <label>Song Title: </label>
          <input type="text" name="songTitle" /><br/><br/>

          <label>Album: </label>
          <input type="text" name="album"/><br/><br/>

          <label>Preview Link: </label>
          <input type="text" name="previewLink"/><br/><br/>

          <label>Artwork: </label>
          <input type="text" name="artwork"/><br/><br/>

          <label>Artist: </label>
          <select name="artistID">
          {artistOptionHTML}
          </select>
          <p> If artist is not present, add a new artist <a href="/artists/new">here</a></p>

          <input type="submit"/>

          </form>
           <a href="/songs/"><button>Back to homepage</button></a>

        </body>
      </html>
    );
  }
}

module.exports = NewSongs;