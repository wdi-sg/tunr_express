var React = require('react');

class UsersNew extends React.Component {
  render() {

    let userButtons = (<div><p><a href="/registration">register</a></p>
                       <p><a href="/login">login</a></p></div>);

    if( this.props.loggedIn === true){
        userButtons = (<form action="/logout?_method=delete" method="POST">
                        <input type="submit" value="logout"/>
                </form>);
    }

    return (
      <html>
        <body>
          <h1>home</h1>
          {userButtons}
          <script src="script.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = UsersNew;
