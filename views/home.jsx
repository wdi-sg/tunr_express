var React = require("react");

class Home extends React.Component {
  render() {
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
            <link rel="stylesheet" href="/css/home.css"/>
        </head>
        <body>
          <h1>Hello World</h1>
          <div className="visits">
            {visitbadge}
          </div>
          <div>
            <a href="/artists">See All Artists</a>
          </div>
          <div>
            <a href="/playlist">See Your Playlists</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;