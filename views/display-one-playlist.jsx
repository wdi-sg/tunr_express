var React = require("react");
var Main = require("./main");

class DisplayOnePlaylist extends React.Component {
  render() {
    let plid = this.props.songsArr[0].playlist_id;
    let link = "/playlist/" + plid;
    let link3 = link + "/newsong";
    let songsArr = this.props.songsArr;
    let songsArrHtml = songsArr.map((element) => {
      let link2 = "/songs/" + element.id;
      return (
        <li>
          <a href={link2}>{element.title}</a>
        </li>
      );
    });

    const displayOnePlaylist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <form method="GET" action={link}>
              <h3>
                <u>Playlist Name: {this.props.plName}</u>
              </h3>
              <br></br>
              <h4>Songs:</h4>
              <ul>{songsArrHtml}</ul>
            </form>

            <a href={link3} className="btn btn-primary">
              Add Songs To Playlist
            </a>
          </div>
        </div>
      </div>
    );

    return <Main children={displayOnePlaylist} />;
  }
}

module.exports = DisplayOnePlaylist;
