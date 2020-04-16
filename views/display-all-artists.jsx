var React = require("react");

class AllArtists extends React.Component {
  render() {

    let artists = this.props.artists;
    let link = "/artists/";
    let artistsHtml = artists.map((element) => {
      let linkToPg = "/artists/" + element.id;
      return <li><a href={linkToPg} >{element.name}</a></li>
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
                <h2>All Artists</h2>
                <br></br>
                <form method="GET" action="/artists/">
                  <ul>
                    {artistsHtml}
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

module.exports = AllArtists;
