var React = require("react");

class New extends React.Component {
  render() {
    let artistArr = this.props.artistArr;
    let name = artistArr.name;
    let nationality = artistArr.nationality;
    let id = artistArr.id;
    return (
      <html>
        <head />
        <body>
            <h3>Edit {name}!</h3>
            <form method="POST" action={"/artists/"+id+"?_method=put"}>
                Name: <input type="text" name="name" value={name}/><br/>
                Nationality: <input type="text" name="nationality" value={nationality}/><br/>
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