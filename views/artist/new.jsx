var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <p>Display the form for a single artist</p>
          <form method="POST" action="/artists">
            Name: <input type="text" name="name"/>
            <br/>
            Photo: <input type="text" name="photo_url"/>
            <br/>
            Nationality: <input type="text" name="nationality"/>
            <br/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;