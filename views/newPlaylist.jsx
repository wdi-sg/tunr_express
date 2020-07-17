var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Add Create your playlist!</h3>
            <form method="POST" action="/playlist">
                Name: <input type="text" name="name"/><br/>
                <input type="submit"/>
            </form>
            <form method="GET" action="/">
                <p>
                    <input type="submit" value="Back"/>
                </p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
