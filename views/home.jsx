var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
      </head>
        <body>
          <h1>Welcome! to Spotify MkII!!</h1>
          <img src="https://media.giphy.com/media/3oz8xTvw09iBpRxtle/giphy.gif"></img><br/><br/>
            <form action='/artists/new'>
              <input type='submit' value='Add New Artist!' />
            </form>
            <form action='/artistsall'>
              <input type='submit' value='See All Artists!' />
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;
