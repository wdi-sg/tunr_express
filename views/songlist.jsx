const React = require('react');
const Template = require('./template');

class SongList extends Template {
  constructor(props) {
    super(props);
    this.title = "Songs";
    this.count = props.sitecount || "YOU DIDN'T PASS A COUNTER (sitecount)";
  }

  renderContent() {

    let songs = this.props.songs;
    console.log(songs);
    let count = songs.length;

    let songList, songTable, headerText, deleteText;
    if (count === 0) {
      headerText =
        <h5 className="p-2 text-center">
          There are no songs in the database. <br />
        </h5>;
      songTable = "";

    } else {
      headerText =
        <h5 className="p-2 text-center">
          There are {count} songs in the database. <br />
        </h5>;

      songList = songs.map(song => {
        let key = `song-${song.id}`;
        let link = `/songs/${song.id}`;

        return (
          <tr key={key}>
            <td><a href="#" className="text-info">{song.title}</a></td>
            <td>{song.album}</td>
            <td>{song.name}</td>
          </tr>
        )
      });

      songTable =
        <div className="my-3"
             style={{overflowY: "scroll", maxHeight: "60vh"}}>
          <table className="table">
            <thead>
              <tr>
                <td className="h5 text-center"
                    colSpan="3">Songs in Database:
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
      <React.Fragment>
        {headerText}
        {songTable}

        <a href="#"
           className="btn btn-info btn-block my-3">
          Add a Song
        </a>

      </React.Fragment>
    );
  }
}

module.exports = SongList;
