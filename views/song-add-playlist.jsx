var React = require("react");
var Main = require("./main");

class SongAddPlaylist extends React.Component {
  render() {
    let link = "/playlist";
    let plArr = this.props.plArr;
    let plArrCheckbox = plArr.map((ele) => {
      return (
        <div className="ml-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="playlist_id"
            value={ele.id}
          />
          <label>{ele.name}</label>
        </div>
      );
    });

    const songAddPl = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Add Song to Playlist</u>
            </h3>
            <br></br>
            <form method="POST" action={link}>
              {plArrCheckbox}
              <input type="hidden" name="song_id" value={this.props.songId} />
              <br></br>
              <input className="btn btn-primary" type="submit" value="Submit" />
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );

    return <Main children={songAddPl} />;
  }
}

module.exports = SongAddPlaylist;
