var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Form Goes Here!</h3>
            <form method="POST" action="/artists">
                Name: <input type="text" name="name"/><br/>
                Nationality: <input type="text" name="nationality"/><br/>
                <input type="submit"/>
            </form>
            <form method="GET" action="/">
                <p>
                    Click here to go back: <br/>
                    <input type="submit" value="Back"/>
                </p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;