var React = require("react");

class Allplaylists extends React.Component {
  render() {
    // CSS stuff


    // Javascript stuff
    const data = this.props.result;

    const allPlaylist = data.map((el, i) => {
      const url = `/playlist/${el.id}`

      return (
        <tr>
          <th scope="row">{i}</th>
          <td><a href={url}>{el.playlist_name}</a></td>
        </tr>
        )
    })

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        </head>
        <body>
          <div>
            <h1>All Playlists</h1>
          </div>
          <div>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Playlist</th>
                </tr>
              </thead>
              <tbody>
                {allPlaylist}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Allplaylists;