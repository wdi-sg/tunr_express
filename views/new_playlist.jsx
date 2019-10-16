var React = require('react');
class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>
                  { this.props.warning }

            <h1>Create a New Playlist</h1>
            <form method="POST" action="/playlist">
            <br/>
            Playlist Name: <input type="text" name="name"/>
            <input type="submit" value="Submit"/>
            </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;