var React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      </head>
        <body>
        <div className="home-container">
          <h1>Welcome!</h1>
          <p>
          <a href="/">Add an Artist</a>
          </p>
          <p>
          <a href="/playlist-index">Playlists</a>
          </p>
          <p>
          <a href="/display-artists">List of Artists</a>
          </p>
          </div>
        <footer className="home-footer">
        <p> No of visits: {this.props.cookieCount}</p>
        </footer>
        </body>
      </html>
    )
  }
}

module.exports = Home;