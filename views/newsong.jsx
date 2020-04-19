var React = require("react");

class New extends React.Component {
  render() {

    // CSS Stuff


    // Javascript Stuff
    const artistID = this.props.artistID;

    const url = `/artists/${artistID}/songs`

    return (
      <html>
        <head />
        <body>
          <h3>Add a new Song</h3>
          <div>
            <form action={url} method="post">
              <input type="text" name="title" placeholder="title"></input><br></br>
              <input type="text" name="album" placeholder="album"></input><br></br>
              <input type="text" name="preview_link" placeholder="audio preview link"></input><br></br>
              <input type="text" name="artwork" placeholder="artwork"></input><br></br>
              <input type="submit" value="Add Song!"></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;