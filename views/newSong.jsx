var React = require("react");

class NewSong extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
          <h3>Add a new Song to the TUNR!</h3>
          <form method="POST" action="/new/song">
                Song Title: <input name="title" type="text" placeholder="Please Me"/><br/>
                <br/>
                Song Album: <input name="album" type="text" placeholder=" ... "/><br/>
                <br/>
                Song Artwork: <input name="artwork" type="text" placeholder="http:// ... .jpg"/><br/>
                <br/>
                Preview Link: <input name="preview_link" type="text" placeholder="http:// ... .mp3"/><br/>
                <br/>
                Artist ID: <input name="artist_id" type="text" placeholder="7"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;