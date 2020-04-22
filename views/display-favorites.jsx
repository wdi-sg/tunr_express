var React = require("react");
var Main = require("./main");

class DisplayFavorites extends React.Component {
  render() {
    
    let songsArr = this.props.songsArr;
    let songsArrHtml = songsArr.map((element) => {
      let link2 = "/songs/" + element.id;
      return (
        <li>
          <a href={link2}>{element.title}</a>
        </li>
      );
    });

    const displayCookiePlaylist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <form method="GET" action="/favorites">
              <h3>
                <u>My Favorite Songs</u>
              </h3>
              <br></br>
              <h4>Songs:</h4>
              <ul>{songsArrHtml}</ul>
            </form>

            {/* <a href={link3} className="btn btn-primary">
              Add Songs To Playlist
            </a> */}
          </div>
        </div>
      </div>
    );

    return <Main children={displayCookiePlaylist} />;
  }
}

module.exports = DisplayFavorites;
