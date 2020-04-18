var React = require("react");
var Main = require("./main");

class NewSong extends React.Component {
  render() {
    let artistArr = this.props.artistArr;
    let artistArrHtml = artistArr.map((ele) => {
      return <option value={ele.id}>{ele.name}</option>;
    });

    const newSong = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>
              <u>Add New Song</u>
            </h3>
            <br></br>
            <form method="POST" action="/songs/new">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="album"
                placeholder="Album"
                className="form-control"
              />
              <br></br>
              <h6>Select Artist:</h6>
              <select name="artist_id" className="custom-select">
                {artistArrHtml}
              </select>
              <br></br>
              <br></br>
              <input
                type="text"
                name="preview_link"
                placeholder="Preview Link"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="artwork"
                placeholder="Artwork Link"
                className="form-control"
              />
              <br></br>
              <input className="btn btn-primary" type="submit" value="Submit" />
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );

    return <Main children={newSong} />;
  }
}

module.exports = NewSong;
