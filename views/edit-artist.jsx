var React = require("react");
var Main = require("./main");

class EditArtist extends React.Component {
  render() {
    let artist = this.props;
    let link = "/artists/" + artist.id + "/edit";

    const editArtist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Edit Artist</u>
            </h3>
            <br></br>
            <form method="POST" action={link}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={artist.name}
              />
              <br></br>
              <br></br>
              <input
                type="text"
                name="photo_url"
                placeholder="Photo URL Link"
                defaultValue={artist.photo_url}
              />
              <br></br>
              <br></br>
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                defaultValue={artist.nationality}
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

    return <Main children={editArtist} />;
  }
}

module.exports = EditArtist;
