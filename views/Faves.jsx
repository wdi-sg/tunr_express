var React = require("react");

class Home extends React.Component {
  render() {
    const favorites = this.props.favorites;
    const favoriteInfo = favorites.map(favorites => {
      return (
        <h6>
          <a href={favorites.preview_link}>{favorites.title}</a>
        </h6>
      );
    });
    <h1>See {this.props.username}'s favorites </h1>;
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-Equiv="X-UA-Compatible" content="ie=edge" />
          <title>Here is the artist you requested!</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossorigin="anonymous"
          ></script>
        </head>
        <body>
          <h1>See favorites!</h1>
          <h6>
            <a href={favorites.preview_link}>{favorites.title}</a>
          </h6>
          <div>{favoriteInfo}</div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
