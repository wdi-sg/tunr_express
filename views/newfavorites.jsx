var React = require("react");

class NewFavorites extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add favorite songs</h3>
            <form action="/favorites" method="POST">
                <p>
                    Song Id<input name="song_id" type ="number"/>
                </p>
                <p>
                    User Id<input name="user_id" type ="number"/>
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

module.exports = NewFavorites;