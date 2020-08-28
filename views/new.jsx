var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
        </head>
        <body>
        <h1>Add a new artist</h1>
          <form method="POST" action="/artists">
          <label>Artist Name: </label>
          <input type="text" name="artistName" /><br/><br/>
          <label>Artist Photo URL: </label>
          <input type="text" name="photoURL"/><br/><br/>
          <label>Artist Nationality: </label>
          <input type="text" name="nationality"/><br/><br/>
          <input type="submit"/>
          </form>
          <a href="/artists/"><button>Back to homepage</button></a>
        </body>
      </html>
    );
  }
}

module.exports = New;