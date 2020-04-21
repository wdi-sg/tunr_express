var React = require("react");

class NewSong extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
          <h3>Create new Song</h3>
            <form action="/songs" method="POST">
                <p>
                    Title<input name="title" type ="text"/>
                </p>
                <p>
                    Album<input name="album" type ="text"/>
                </p>
                <p>
                    Preview Link<input name="preview_link" type ="text"/>
                </p>
                <p>
                    Artwork<input name="artwork" type ="text"/>
                </p>
                <p>
                    Artist Id<input name="artist_id" type ="number"/>
                </p>
                <button type = "submit">Submit</button>
            </form>
            <p>Number of visits:</p>
            <p>{this.props.badge}</p>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;