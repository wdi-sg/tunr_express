var React = require("react");

class DisplayOneSong extends React.Component {
  render() {
    let song = this.props;
    console.log(song);
    let link = "/songs/" + song.id;
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
                  <h3><u>Title: {song.title}</u></h3>
                  <ul>
                    <li>Id: {song.id}</li>
                    <li>Album: {song.album}</li>
                    <li>
                      Preview:
                      <br></br>
                      <img
                        src={song.preview_link}
                        height="300"
                        width="300"
                      ></img>
                    </li>
                    <li>
                      Artwork:
                      <br></br>
                      <img src={song.artwork} height="300" width="300"></img>
                    </li>
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

module.exports = DisplayOneSong;
