var React = require("react");

class FavoriteSong extends React.Component {
  render() {
        let name=this.props.name;
    return (
      <html>
        <head />
        <body>
          <h3>Save Fovorite Song</h3>
            <form method="POST" action={"/favorites?_method=POST"}>
            <table>
                <tr>
                    <td>Current logged in user : {name}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Song ID:</td>
                    <td><input name="song_id" value={this.props.song_id} /></td>
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

module.exports = FavoriteSong;
