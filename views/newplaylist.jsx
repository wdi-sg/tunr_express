var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
          <h3>Create new playlist</h3>
            <form action="/playlist" method="POST">
                <p>
                    Name<input name="name" type ="text"/>
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

module.exports = NewPlaylist;