var React = require("react");

class NewSong extends React.Component {
  render() {
    var url = '/homepage/'+this.props.id;
    return (
      <html>
        <head />
        <body>
            <h1>Add new song</h1>
            <form method="POST" action={url}>
                <h2>Song title</h2>
                <input type="text" name="title"/>
                <h2>Song album</h2>
                <input type="text" name="album"/>
                <h2>Preview</h2>
                <input type="text" name="preview_link"/>
                <h2>Image</h2>
                <input type="text" name="artwork"/>
                <h2>Artist id</h2>
                <input type="text" name="artist_id" readOnly="readOnly" defaultValue={this.props.id}/>
                <br />
                <input type="submit"/>
            </form>
            <a href={url}>Home</a>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;