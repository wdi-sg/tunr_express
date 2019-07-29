var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create New Artist</h3>
            <form method="POST" action={"/artist"}>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input name="name" value={this.props.name} /></td>
                </tr>
                <tr>
                    <td>Image</td>
                    <td><input name="photo_url" value={this.props.photo_url} /></td>
                </tr>
                <tr>
                    <td>Nationality</td>
                    <td><input name="nationality" value={this.props.nationality} /></td>
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
