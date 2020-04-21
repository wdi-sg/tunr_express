var React = require("react");

class New extends React.Component {
  render() {

    // CSS Stuff


    // Javascript Stuff
    const artistID = this.props.artistID;

    const visits = this.props.visits;

    console.log(visits)

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

    const url = `/artists/${artistID}/songs`

    return (
      <html>
        <head>
            <link rel="stylesheet" href="/css/newsong.css"/>
        </head>
        <body>
          <h3>Add a new Song</h3>
          <div className="visits">
            {visitbadge}
          </div>
          <div>
            <form action={url} method="post">
              <input type="text" name="title" placeholder="title"></input><br></br>
              <input type="text" name="album" placeholder="album"></input><br></br>
              <input type="text" name="preview_link" placeholder="audio preview link"></input><br></br>
              <input type="text" name="artwork" placeholder="artwork"></input><br></br>
              <input type="submit" value="Add Song!"></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;