var React = require("react");
var Main = require("./main");

class DisplayOneArtist extends React.Component {
  render() {
    let artist = this.props;
    let link = "/artists/" + artist.id;
    let link2 = link + "/songs";
    let link3 = link + "/edit";

    const displayOneArtist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Artist</u>
            </h3>
            <br></br>
            <form method="GET" action={link}>
              <h4>Id:</h4>
              <p>{artist.id}</p>
              <h4>Name:</h4>
              <p>{artist.name}</p>
              <h4>Nationality:</h4>
              <p>{artist.nationality}</p>
              <h4>Photo:</h4>
              <img src={artist.photo_url} height="300" width="300"></img>
            </form>
            <br></br>
            <a href={link2} className="btn btn-primary">
              View All Songs By Artist
            </a>
            <br></br>
            <br></br>
            <a href={link3} className="btn btn-primary">
              Edit Artist
            </a>
          </div>
        </div>
      </div>
    );

    return <Main children={displayOneArtist} />;
  }
}

module.exports = DisplayOneArtist;
