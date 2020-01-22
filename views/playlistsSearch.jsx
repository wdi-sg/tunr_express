const React = require("react");

class playlistsSearch extends React.Component {
  render() {
    const songs = this.props.songs.map(songs => {
      return (
        <option value={songs.id}>
          {songs.album} - {songs.title}
        </option>
      );
    });
    return (
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Here is the playlist you requested!</title>
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
            <h1>Here is the playlist you requested!</h1>
          </div>
          <div>
            <ul>
              <li>
                <strong>Id</strong>: {this.props.id}
              </li>
              <li>
                <strong>Name</strong>: {this.props.name}
              </li>
            </ul>
            {/* <ul>ID: {songs}</ul> */}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = playlistsSearch;
