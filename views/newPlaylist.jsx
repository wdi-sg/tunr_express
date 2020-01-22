var React = require("react");

class NewPlaylist extends React.Component {
  render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
    return (
      <html>
        <head/>
            <title>Create Playlist Form</title>
        <body>
            <h1>Wana add a <span style={{ color: "#4D8EDD", fontWeight: "lighter"}}>NEW</span> Playlist? Do it here!</h1>
            <form method="POST" action="/playlist">
                <p>Name: <input type="text" name="name" required/></p>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;