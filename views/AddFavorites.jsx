const React = require("react");

class AddFavorites extends React.Component {
  render() {
    return (
      <div>
        <h1>add a new favorite song</h1>
        <form action="/favorites" method="POST">
            <input type="number" name="song_id" placeholder="enter song id"/><br/>
            <input type="submit" value="add favorite song"/>
        </form>
      </div>
    );
  }
}

module.exports = AddFavorites;
