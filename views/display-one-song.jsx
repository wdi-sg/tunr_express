var React = require("react");
var Main = require("./main");

class DisplayOneSong extends React.Component {
  render() {
    let song = this.props;
    let link = "/songs/" + song.id;
    let href2 = link + "/add";

    const displayOneSong = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <form method="GET" action={link}>
              <h3>
                <u>Title: {song.title}</u>
              </h3>
              <ul>
                <li>Id: {song.id}</li>
                <li>Artist: {song.name}</li>
                <li>Album: {song.album}</li>
                <li>
                  Preview:
                  <br></br>
                  <img src={song.preview_link} height="300" width="300"></img>
                </li>
                <li>
                  Artwork:
                  <br></br>
                  <img src={song.artwork} height="300" width="300"></img>
                </li>
              </ul>
            </form>
            <a className="btn btn-info" href={href2}>
              Add To Playlist
            </a>
            <br></br>
            <form method="POST" action="/favorites">
              <input
                type="hidden"
                name="songid"
                value={song.id}
                className="form-control"
              />
              <br></br>
              <input className="btn btn-info" type="submit" value="Add To Favorites" />
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );

    return <Main children={displayOneSong} />;
  }
}

module.exports = DisplayOneSong;
