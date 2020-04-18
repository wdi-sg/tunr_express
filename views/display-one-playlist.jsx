var React = require("react");

class DisplayOnePlaylist extends React.Component {
  render() {
    let plid = this.props.songsArr[0].playlist_id;
    let link = "/playlist/" + plid;
    let songsArr = this.props.songsArr;
    let songsArrHtml = songsArr.map((element) => {
      return <li>{element.title}</li>;
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
                <form method="GET" action={link}>
                  <h3><u>Playlist Name: {this.props.plName}</u></h3>
                  <br></br>
                  <h4>Songs:</h4>
                  <ul>
                    {songsArrHtml}
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DisplayOnePlaylist;
