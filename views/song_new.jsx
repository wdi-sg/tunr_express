var React = require("react");

class New extends React.Component {
  render() {
    let artist_id=this.props.artist_id;
        console.log(artist_id);
    return (
      <html>
        <head />
        <body>
          <h3>Create New Song</h3>
            <form method="POST" action={"/artist/"+this.props.artist_id+'/songs?_method=POST'}>
            <table>
                <tr>
                    <td>title</td>
                    <td><input name="title" value={this.props.title} /></td>
                </tr>
                <tr>
                    <td>Album</td>
                    <td><input name="album" value={this.props.album} /></td>
                </tr>
                <tr>
                    <td>Preview Link</td>
                    <td><input name="preview_link" value={this.props.preview_link} /></td>
                </tr>
                <tr>
                    <td>Artwork</td>
                    <td><input name="artwork" value={this.props.artwork} />
                    <input name="artist_id" value={this.props.artist_id} hidden/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type='submit' /></td>
                </tr>
            </table>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
