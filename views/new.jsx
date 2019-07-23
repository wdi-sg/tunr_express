var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
          <h3 className="text-center">CREATE NEW ARTIST</h3>
          <form method="POST" action="/artist?_method=POST" className="text-center">
                <p>Name</p><input name="name" size="45"/>
                <p>Photo URL</p><input name="photo_url" size="45"/>
                <p>Nationality</p><input name="nationality" size="45"/>
                <p></p>
                <p><input value="Submit" type="submit"/></p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
