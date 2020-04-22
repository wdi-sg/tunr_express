var React = require("react");

class Favourite extends React.Component {
  render() {
        // console.log("favourites.jsx");

        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };

        let user = this.props.cookies.user;
        let userId = this.props.user.id;

    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css" />
      </head>
        <body>
            <a href='/'>Back to Main</a>
            <br />
            <br />
          <h3>Favourite</h3>
          <p>Hello {user}</p>
          <form method="POST" action="/favourites">
            <p><input name="user_id" type="hidden" value={userId} readOnly /></p>
            <p>Enter Song's ID to add: <input name="song_id" /></p>
            <p><input type="submit" value="Add to Favourite"/></p>
          </form>
          <br/>
          <div>
              <p>Visits: <span className="cookiesV">{cookiesVisits}</span></p>
              <p className="badge-title">User's Badge</p>
              <p className="badge"></p>
          </div>
          <script src="/script.js"></script>
        </body>
      </html>
    );
  }
};

module.exports = Favourite;
