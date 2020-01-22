const React = require("react");

class artistsSearch extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charset="UTF-8" />
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
          <div>
            <h1>Here is the artist you requested!</h1>
          </div>
          <div>
            <ul>
              <li>
                <strong>Id</strong>: {this.props.id}
              </li>
              <li>
                <strong>Name</strong>: {this.props.name}
              </li>
              <li>
                <strong>Photo URL</strong>: {this.props.photo_url}
              </li>
              <li>
                <strong>Nationality</strong>: {this.props.nationality}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = artistsSearch;
