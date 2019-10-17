var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Add new songs!</h3>
            <form method="POST" action={"/favorites"}>
                Title: <input type="text" name="title"/><br/>
                Album: <input type="text" name="album"/><br/>
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