var React = require("react");


//this is the overall style of all subsequent pages for the user to navigate
class Layout extends React.Component {
  render() {
    var showLogin =
    <form action="/login" method="POST">
    <label>Username</label><br/>
    <input type="text" name="username"/><br/><br/>
    <label>Password</label><br/>
    <input type="text" name="password"/><br/><br/>
    <input type="submit" value="Login"/>
    </form>
    if (this.props.cookies.loginstatus){
      showLogin = "Welcome "+this.props.cookies.username;
    }
    console.log(this.props.cookies)

    return (
      <html>
      <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <head>
        </head>
        <body>
        {showLogin}
        <br/><br/>
        <form action="/artists" method="get">
        <input type="submit" value="Back to index"/>
        </form><br/><br/>
        <form action="/secretpage" method="get">
        <input type="submit" value="To secret page for registered users only"/>
        </form><br/><br/>
        <form action="/register" method="get">
        <input type="submit" value="Sign up"/>
        </form><br/><br/>
        <form action="/playlist" method="get">
        <input type="submit" value="Go to playlists"/>
        </form><br/><br/>
        <form action="/favorites" method="get">
        <input type="submit" value="Go to your favorites playlists"/>
        </form><br/><br/>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = Layout;


// <form action="/login" method="get">
// <input type="submit" value="Login"/>
// </form><br/><br/>
