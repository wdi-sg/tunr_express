var React = require("react");

class PlaylistSongAdd extends React.Component {
  render() {
    let id = this.props.id;
    return (
      <html>
        <head />
        <body>
            <h3>Add new song to playlist!</h3>
            <form method="POST" action={"/playlist/"+id}>
                Song Name: <input type="text" name="name"/><br/>
                <input type="submit"/>
            </form>
            <form method="GET" action="/">
                    <input type="submit" value="Back"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistSongAdd;
