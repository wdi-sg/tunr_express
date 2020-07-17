const React = require('react');

class New extends React.Component {
  render(){
    console.log(this.props.id);
    return(
      <html>
        <body>
          <h1>Add New Song</h1>
          <form action={`/artists/${this.props.id}/songs`} method="POST">
            <p>Title</p>
            <input type="text" name="title"/><br/><br/>
            <p>Album</p>
            <input type="text" name="album"/><br/><br/>
            <p>Preview Link</p>
            <input type="text" name="preview_link"/><br/><br/>
            <p>Artwork</p>
            <input type="text" name="artwork"/><br/><br/>
            <input type="hidden" name="artist_id" defaultValue={this.props.id}/>
            <input type="submit" value="Create New Song"/><br/><br/><br/><br/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = New;