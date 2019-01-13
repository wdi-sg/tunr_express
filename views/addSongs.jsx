var React = require("react");
// Adding of new Artists
class AddSong extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Adding a New Song</h3>
        <form method="POST" action="/artists/" +{artist.id}+ "/songs/">
            Song Title: <input name = "title" placeholder="Title"/> <br/>
             Song Album: <input name = "title" placeholder="Album"/> <br/>
             ArtWork URL: <input name = "preview_link" placeholder="ArtWork URL"/> <br/>

             <a href="/artists/" +{artist.id}+ "/songs/"><input type = "submit" /> </a>
        </form>
        </body>
      </html>
    );
  }
}

module.exports = AddSong;
