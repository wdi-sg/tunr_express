var React = require("react");

class PlaylistAddSong extends React.Component {
  render() {
    let link = "/playlist/" + this.props.pl_id;
    let songsArr = this.props.songsArr;
    let songsArrOptn = songsArr.map((element) => {
      let innerText =
        element.id +
        ". " +
        element.name +
        " --- " +
        element.title +
        " --- " +
        element.album;
      return <option>{innerText}</option>;
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
                <h3>Add Song To Playlist</h3>
                <br></br>
                <h4>Playlist Name: {this.props.pl_name}</h4>
                <br></br>
                <p>
                  <em>
                    <font color="red">{this.props.comments}</font>
                  </em>
                </p>
                <form method="POST" action={link}>
                  <select name="song_selected" className="custom-select" defaultValue={this.props.defaultVal}>
                    {songsArrOptn}
                  </select>
                  <input
                    type="hidden"
                    name="plid"
                    defaultValue={this.props.pl_id}
                  />
                  <br></br>
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

module.exports = PlaylistAddSong;
