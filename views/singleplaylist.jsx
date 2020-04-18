var React = require("react");

class Singleplaylist extends React.Component {
  render() {
    // CSS stuff


    // Javascript stuff
    const playlistDetails = this.props.playlistDetails[0];

    const playlistName = playlistDetails.playlist_name;

    const playlistID = playlistDetails.id;

    const newSongURL = `/playlist/${playlistID}/newsong`;

    // const allPlaylist = data.map((el, i) => {

    //   return (
    //     <tr>
    //       <th scope="row">{i}</th>
    //       <td>{el.playlist_name}</td>
    //     </tr>
    //     )
    // })

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        </head>
        <body>
          <div>
            <div>
            <h1>{playlistName}</h1>
            </div>
            <div>
                <a href={newSongURL}>+</a>
            </div>
          </div>
          <div>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Songs</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Singleplaylist;