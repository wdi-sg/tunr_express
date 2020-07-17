var React = require("react");

class Addsong extends React.Component {
  render() {
    return (
      <html>
        <body>
        <div>
        <h1>Add track into </h1>
        <form action={'/playlist/'+this.props.id} method="POST">
        <p>Song_id :</p><input type="number" name="song_id" required/><br/>
        <br/><input type="submit" value="Submit"/>
        </form>
        </div>
        </body>
      </html>
    )
  }
}

module.exports = Addsong;