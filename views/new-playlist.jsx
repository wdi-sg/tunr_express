var React = require("react");
var Main = require("./main");

class NewPlaylist extends React.Component {
  render() {
    const newPlaylist = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Add New Playlist</u>
            </h3>
            <br></br>
            <form method="POST" action="/playlist/new">
              <input
                type="text"
                name="name"
                placeholder="Name"
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

    return <Main children={newPlaylist} />;
  }
}

module.exports = NewPlaylist;
