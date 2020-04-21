var React = require("react");

class Newartist extends React.Component {
  render() {
    // CSS stuff
    const formStyle = {
                        "display" : "flex",
                        "justifyContent" : "center",
                        "marginTop" : "20px"
                    }

    const title = {
                    "textAlign" : "center"
                }

    const inputStyle = {
                        "width" : "250px",
                        "height" : "50px",
                        "margin" : "5px"
                    }

    // Javascript stuff
    const visits = this.props.visits;

    let visitbadge;

    if(visits < 5){
        visitbadge = <figure>
                        <img src="/newbie_badge.jpg"></img>
                        <figcaption>Visits: {visits}</figcaption>
                    </figure>
    } else if (visits > 4 && visits < 10) {
        visitbadge = <figure>
                        <img src="/silver_badge.svg"></img>
                        <figcaption>Visits: {visits}</figcaption>
                    </figure>
    } else if (visits > 9){
        visitbadge = <figure>
                        <img src="/gold_badge.svg"></img>
                        <figcaption>Visits: {visits}</figcaption>
                    </figure>
    }


    return (
      <html>
        <head>
            <link rel="stylesheet" href="/css/newartist.css"/>
        </head>
        <body>
          <h1 style={title}>Add a New Artist</h1>
          <div className="visits">
            {visitbadge}
          </div>
          <div style={formStyle}>
            <form action="/artists" method="post">
                <input type="text" name="name" placeholder="Artist Name" style={inputStyle}></input><br></br>
                <input type="text" name="photo_url" placeholder="photo url" style={inputStyle}></input><br></br>
                <input type="text" name="nationality" placeholder="nationality" style={inputStyle}></input><br></br>
                <input type="submit" value="Add Artist" style={inputStyle}></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Newartist;