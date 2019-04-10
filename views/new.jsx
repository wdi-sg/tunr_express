var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <form method="POST" action="/new">
                Artist Name: <input name="artistName" type="text" placeholder="Bruno Mars"/><br/>
                <br/>
                Photo: <input name="photoURL" type="text" placeholder="http:// ... .jpg"/><br/>
                <br/>
                Photo: <input name="nationality" type="text" placeholder="Russian??"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;