var React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <h1>Welcome to TUNER DB</h1>

          <a href="/artists">
            <button className="btn btn-primary">View All Artists</button>
          </a>
          <a href="/artists/new">
            <button className="btn btn-primary">Add An Artist</button>
          </a>
        </body>
      </html>
    );
  }
}

module.exports = Home;
