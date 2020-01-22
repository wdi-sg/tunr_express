var React = require("react");

class playlistNew extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpequiv="X-UA-Compatible" content="ie=edge" />
          <title>Create Playlist</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body>
          <div
            style={{ margin: `20px`, display: `flex`, flexDirection: `column` }}
          >
            <h1>Create a new playlist!</h1>
            <div style={{ marginBottom: `10px` }}></div>

            <form action="/playlist" method="POST">
              <div style={{ paddingBottom: `10px` }}>
                <input
                  type="text"
                  placeholder="playlist name"
                  name="playlist_name"
                />
              </div>

              <div>
                <input
                  type="submit"
                  value="Create!"
                  style={{ borderRadius: `5px`, marginRight: `10px` }}
                />
              </div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = playlistNew;
