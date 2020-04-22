var React = require("react");
var Main = require("./main");

class PlaylistAddSong extends React.Component {
  render() {
    let link = "/playlist/" + this.props.pl_id;
    let songsArr = this.props.songsArr;
    let songsArrOptn = songsArr.map((element) => {
      let innerText =
        element.id +
        ". " +
        element.name +
        " --- " +
        element.title +
        " --- " +
        element.album;
      return <option>{innerText}</option>;
    });

    const plAddSong = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Add Song To Playlist</u>
            </h3>
            <br></br>
            <h4>Playlist Name: {this.props.pl_name}</h4>
            <br></br>
            <p>
              <em>
                <font color="red">{this.props.comments}</font>
              </em>
            </p>
            <form method="POST" action={link}>
              <select
                name="song_selected"
                className="custom-select"
                defaultValue={this.props.defaultVal}
              >
                {songsArrOptn}
              </select>
              <input
                type="hidden"
                name="plid"
                defaultValue={this.props.pl_id}
              />
              <br></br>
              <br></br>
              <input className="btn btn-primary" type="submit" value="Submit" />
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );

    return <Main children={plAddSong} />;
  }
}

module.exports = PlaylistAddSong;
