const React = require("react");

class newsong extends React.Component {
  render() {
    const filePath = "/playlist/" + this.props.playlistId + "?_method=post";
    const songs = this.props.songs.map(songs => {
      return (
        <option value={songs.id}>
          {songs.title} - {songs.album}
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
          <title>Add a new song</title>
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
          <div
            style={{ margin: `20px`, display: `flex`, flexDirection: `column` }}
          >
            <h1>Add a new song in playlist {this.props.playlistId} </h1>
            <div style={{ marginBottom: `10px` }}></div>

            <form action={filePath} method="POST">
              <div style={{ paddingBottom: `10px` }}>
                <select name="song_id">{songs}</select>
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

module.exports = newsong;
