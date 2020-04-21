var React = require("react");

class New extends React.Component {
  render() {

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
        <body>
        <div>
        <form method="POST" action="/artists">
         Name: <input type="text" name="name"/>
          <br /><br />
          Photo URL: <input type="text" name="photo_url"/>
          <br /><br />
          Nationality: <input type="text" name="nationality"/>
          <br /><br />
          <button type="submit">Submit</button>
          </form>
          </div>
        </body>
        </html>
    );
  }
}

module.exports = New;