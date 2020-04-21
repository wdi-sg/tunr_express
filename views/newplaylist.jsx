var React = require("react");

class Newplaylist extends React.Component {
  render() {
    // CSS stuff

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
            <link rel="stylesheet" href="/css/newplaylist.css"/>
        </head>
        <body>
          <h1>New Playlist</h1>
          <div className="visits">
            {visitbadge}
          </div>
          <form action="/playlists/show" method="post">
            <input type="text" name="playlist" placeholder="playlist name"></input>
            <input type="submit" value="Get Playlist!"></input>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;