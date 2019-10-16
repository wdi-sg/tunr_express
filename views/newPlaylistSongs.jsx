var React = require("react");

class New extends React.Component {
  render() {
    let id = this.props.id;
    return (
      <html>
        <head />
        <body>
            <h3>Add new song to playlist!</h3>
            <form method="POST" action={"/playlist/"+id}>
                Song Name: <input type="text" name="name"/><br/>
                Album Name: <input type="text" name="album"/><br/>
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