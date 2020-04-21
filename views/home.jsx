var React = require("react");

class Home extends React.Component {
  render() {
    // Visit badge
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

    // Log in stuff
    let homeDisplay;

    if(this.props.username){
        homeDisplay = (
            <div className="row">
                <div className="col-sm-6">
                    <a href="/artists">See All Artists</a>
                </div>
                <div className="col-sm-6">
                    <a href="/playlist">See Your Playlists</a>
                </div>
            </div>
                       )
    }else{
        homeDisplay = (
            <div className="row">
                <div className="col-sm-6">
                    <form action="/login" method="get">
                        <input type="text" name="user" placeholder="username"></input>
                        <input type="text" name="password" placeholder="password"></input>
                        <input type="submit" value="login"></input>
                    </form>
                </div>
            </div>
                       )
    }

    return (
      <html>
        <head>
            <link rel="stylesheet" href="/css/home.css"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
        </head>
        <body>
          <h1>Hello World</h1>
          <div className="visits">
            {visitbadge}
          </div>
          <div className="container">
            {homeDisplay}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;