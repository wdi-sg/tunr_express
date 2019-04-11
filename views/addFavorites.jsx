var React = require("react");
// <p>Song: </p><input type="text" name="song1" placeholder="E.g. You are the reason" />

class addFavorites extends React.Component {
  render() {

    const options = this.props.songs.map(item => {
      return <option value={item.id}>{item.title}</option>
    });

    return (
      <html>
      <head>
      <script src="/addSongsToFavorites.js"></script>
      </head>
        <body>
        <h1>Add Songs to Favorites</h1>
          <h3>
          <form method="post" action="/favorites" >
            <div id="container">
            <p>Song:</p>
            <select name="song1">
            {options}
            </select>
            <button type="button" id="button">Add another song</button>
            <br/>
            </div>
            <br/><input type="submit" value="Submit" />
          </form>
          </h3>
        </body>
      </html>
    );
  }
}

module.exports = addFavorites;
