var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h2>Add a new artist</h2>
          <div>
            <form method="POST" action="/artists">
              Name: <input type="text" name="name" id="name"/>
              <br/>
              Photo Url: <input type="text" name="photo_url" id="photo"/>
              <br/>
              Nationality: <input type="text" name="nationality" id="nationality"/>
              <br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
          <br/>
          <br/>
          <h2>Add a new song</h2>
          <div>
            <form method="POST" action="/songs">
              Title: <input type="text" name="title" id="title"/>
              <br/>
              Album: <input type="text" name="album" id="album"/>
              <br/>
              Preview_link: <input type="text" name="preview_link" id="preview_link"/>
              <br/>
              Artwork: <input type="text" name="artwork" id="artwork"/>
              <br/>
              Artist ID: <input type="text" name="artist_id" id="artist_id"/>
              <br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
