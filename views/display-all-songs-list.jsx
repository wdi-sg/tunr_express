var React = require("react");

class DisplayAllSongsList extends React.Component {
  render() {
    
    let link = "/songs";
    let songsArr = this.props.songsArr;
    let songsArrHtml = songsArr.map((element) => {
      let href = "/songs/" + element.id;
      let href2 = href + "/add";
      let text = element.title + " | " + element.name;
    return <li><a href={href}>{text}</a><br></br><a href={href2}><button className="btn btn-info">Add Song To Playlist</button></a><br></br><br></br></li>;
  
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
                  <h3><u>All Songs</u></h3>
                  <br></br>
              
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

module.exports = DisplayAllSongsList;
