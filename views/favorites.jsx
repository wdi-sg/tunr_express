var React = require("react");

class Favorites extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/new.css"/>
        </head>
        <body>
          <h3>LOGIN</h3>
          <div className="wrapper_new">


            <p>Enter your favorite song ID</p>
                <form action="/login" method="POST">
                    <p>Favorite song ID: </p><input type="text" className="input-field" name="song_id"/>
                    <p><input type="submit" value="Submit"/></p>
                </form>
            </div>


        </body>
      </html>
    );
  }
}

module.exports = Favorites;
