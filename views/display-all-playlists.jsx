var React = require("react");

class DisplayAllPlaylist extends React.Component {
  render() {
    
    let link = "/playlist";
    let plArr = this.props.plArr;
    let plArrHtml = plArr.map((element) => {
      let href = "/playlist/" + element.id;
    return <li><a href={href}>{element.name}</a></li>;
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
                  <h3><u>All Playlists</u></h3>
                  <br></br>
              
                  <ul>
                    {plArrHtml}
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

module.exports = DisplayAllPlaylist;
