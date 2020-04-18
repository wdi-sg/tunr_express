var React = require("react");

class SongAddPlaylist extends React.Component {
  render() {
    let link = "/playlist";
    let plArr = this.props.plArr;
    let plArrCheckbox = plArr.map((ele) => {
      return (
        <div className="ml-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="playlist_id"
            value={ele.id}
          />
          <label>{ele.name}</label>
        </div>
      );
    });

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <div className="container">
            <div className="row">
              <div className="col mt-5">
                <h3>
                  <u>Add Song to Playlist</u>
                </h3>
                <br></br>
                <form method="POST" action={link}>
                  {plArrCheckbox}
                  <br></br>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                  <br></br>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SongAddPlaylist;
