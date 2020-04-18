const React = require('react');
const Head = require('./head');

class ArtistDelete extends React.Component {
  render() {
    let deleteLink = `/artists/${this.props.id}?_method=delete`;
    let backLink = `/artists/${this.props.id}`;
    let songs = this.props.songs;
    let count = songs.length;

    let songList, songTable, headerText, deleteText;
    if (count === 0) {
      headerText =
        <h5 class="p-2 bg-success text-white rounded-lg text-center">
          {this.props.name} has no songs in the database. <br />
        </h5>;
      deleteText = "Delete Artist";
      songTable = "";

    } else {
      headerText =
        <h5 class="p-2 bg-danger text-white rounded-lg text-center">
         {this.props.name} has {count} songs in the database. <br />
          Deleting the artist will delete all their songs as well.
        </h5>;
      deleteText = "Delete Artist and All Songs";

      songList = songs.map(song => {
        let key = song.id;

        return (
          <tr key={key}>
            <td>{song.title}</td>
            <td>{song.album}</td>
          </tr>
        )
      });

      songTable =
        <div className="my-3"
             style={{"overflow-y": "scroll", "max-height": "70vh"}}>
          <table className="table">
            <thead>
              <tr>
                <td className="h5 text-center"
                    colSpan="2">Songs in Database:
                </td>
              </tr>
            </thead>
            <tbody>
              {songList}
            </tbody>
          </table>
        </div>;
    }

    return (
      <html>
        <Head />

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col-8 offset-2">
                {headerText}
                {songTable}
                <form action={deleteLink} method="post">
                  <button type="submit"
                          className="btn btn-danger btn-block my-3">
                    {deleteText}
                  </button>
                </form>
                <a href={backLink}
                   className="btn btn-info btn-block">
                  Go Back to Artist Page
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistDelete;
