var React = require("react");

class NewFav extends React.Component {
  render() {
    let id = this.props.id;
    return (
      <html>
        <head />
        <body>
            <h3>Add new songs to your Favorites!</h3>
              <form method="POST" action ="/favorites/form">
                song_id: <input type="number" name="song_id"/><br/>
              <input type="submit" name="add to Fav"/>
            </form>
            <form method="GET" action="/">
                <p>
                    Click here to go back: <br/>
                    <input type="submit" value="Back"/>
                </p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewFav;
