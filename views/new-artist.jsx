var React = require("react");
var Main = require("./main");

class NewArtist extends React.Component {
  render() {
    const newArtist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Add New Artist</u>
            </h3>
            <br></br>
            <form method="POST" action="/artists/new">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
              />
              <br></br>
              <br></br>
              <input
                type="text"
                className="form-control"
                name="photo_url"
                placeholder="Photo URL Link"
              />
              <br></br>
              <br></br>
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                className="form-control"
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

    return <Main children={newArtist} />;
  }
}

module.exports = NewArtist;
