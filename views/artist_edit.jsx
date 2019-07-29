var React = require("react");

class Edit extends React.Component {
  render() {
        let artist=this.props.artist;
        console.log(artist);
    return (
      <html>
        <head />
        <body>
          <h3>Edit Artist</h3>
            <form method="POST" action={"/artist/"+this.props.artist.id+'?_method=PUT'}>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input name="name" value={this.props.artist.name} /></td>
                </tr>
                <tr>
                    <td>Image</td>
                    <td><input name="photo_url" value={this.props.artist.photo_url} /></td>
                </tr>
                <tr>
                    <td>Nationality</td>
                    <td><input name="nationality" value={this.props.artist.nationality} /></td>
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

module.exports = Edit;
