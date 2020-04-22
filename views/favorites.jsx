var React = require("react");

class Favorites extends React.Component {
  render() {



    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      </head>
        <body>
        <div>
          <h1>Favorites</h1>
          <div>
          <ol>
          </ol>
          </div>
          </div>
        <footer className="home-footer">
        <p> No of visits: {this.props.cookieCount}</p>
        </footer>
        </body>
      </html>
    )
  }
}

module.exports = Favorites;