var React = require("react");

class New extends React.Component {
  render() { console.log(this.props.id)
    return (
      <html>
        <head />
        <body>
          <h3>Add Song</h3>
          <form method ="POST" action="../students">
            <input type="hidden" name="playlist_id" value={this.props.id}/><br/><br/>
            <label htmlFor ="artist_id">Song Name</label><br/>
            <input type="text" name="name"/><br/><br/>
            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
