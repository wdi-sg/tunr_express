var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>

        <body>
          <h2 class="m-3">New Artist</h2>

          <form class="m-3" method="POST" action="/artists">
             Name: <input type="text" name="name" required/><br/>
              Photo URL: <input type="url" name="photo_url" required/><br/>
              Nationality: <input type="text" name="nationality" required/><br/>
              <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
