var React = require("react");
var Main = require("./main");

class AllArtists extends React.Component {
  render() {
    let artists = this.props.artists;
    let link = "/artists/";
    let artistsHtml = artists.map((element) => {
      let linkToPg = link + element.id;
      return (
        <li>
          <a href={linkToPg}>{element.name}</a>
        </li>
      );
    });

    const allArtists = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>All Artists</u>
            </h3>
            <br></br>
            <form method="GET" action={link}>
              <ul>{artistsHtml}</ul>
            </form>
          </div>
        </div>
      </div>
    );

    return <Main children={allArtists} />;
  }
}

module.exports = AllArtists;
