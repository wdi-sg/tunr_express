var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Creates New Artists!</h3>
             <form action="/artists" method="POST">
                <p>ID: </p> <input type="text" name="id"/><br/>
                <p>Name: </p> <input type="text" name="name"/><br/>
                <p>Photo_URL: </p> <input type="text" name="photo"/><br/>
                <p>Nationality: </p> <input type="text" name="nationality"/><br/>
                <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = New;