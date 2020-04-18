var React = require("react");
var Main = require("./main");

class DisplayAllPlaylist extends React.Component {
  render() {
    let link = "/playlist";
    let plArr = this.props.plArr;
    let plArrHtml = plArr.map((element) => {
      let href = "/playlist/" + element.id;
      return (
        <li>
          <a href={href}>{element.name}</a>
        </li>
      );
    });

    const allPlaylist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <form method="GET" action={link}>
              <h3>
                <u>All Playlists</u>
              </h3>
              <br></br>

              <ul>{plArrHtml}</ul>
            </form>
          </div>
        </div>
      </div>
    );

    return <Main children={allPlaylist} />;
  }
}

module.exports = DisplayAllPlaylist;
